/**
 * EEStUdy Place 首页 3D 线框模型
 * 使用 Three.js 实现真正的 3D 渲染
 * 诺贝尔奖配色方案：米色 #F9F8F4 和金箔色 #C5A059
 */

(function() {
  'use strict';

  // 性能检测：低性能设备禁用动画
  const isLowEndDevice = () => {
    return navigator.hardwareConcurrency <= 2 ||
           window.innerWidth < 768;
  };

  // 移动端直接返回
  if (window.innerWidth < 768 || isLowEndDevice()) {
    return;
  }

  // 检查 Three.js 是否加载
  if (typeof THREE === 'undefined') {
    console.warn('Three.js 未加载，3D 动画无法运行');
    return;
  }

  /**
   * 3D 线框场景管理器
   */
  class WireframeScene {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;

      this.init();
      this.createObjects();
      this.bindEvents();
      this.animate();
    }

    init() {
      // 场景
      this.scene = new THREE.Scene();

      // 相机
      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.position.z = 5;

      // 渲染器
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // 鼠标交互
      this.mouseX = 0;
      this.mouseY = 0;
      this.targetRotationX = 0;
      this.targetRotationY = 0;

      // 检测暗色模式
      this.isDarkMode = document.documentElement.getAttribute('data-md-color-scheme') === 'slate';

      // 监听主题切换
      this.observeThemeChange();
    }

    observeThemeChange() {
      // 监听 data-md-color-scheme 属性变化
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'data-md-color-scheme') {
            const newScheme = document.documentElement.getAttribute('data-md-color-scheme');
            this.isDarkMode = newScheme === 'slate';
            this.updateObjectColors();
          }
        });
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-md-color-scheme']
      });
    }

    updateObjectColors() {
      // 根据主题更新所有物体颜色
      const newColor = this.isDarkMode ? 0xD4AF7A : 0xC5A059;

      this.objects.forEach((obj) => {
        obj.mesh.material.color.setHex(newColor);
      });
    }

    createObjects() {
      this.objects = [];

      // 根据当前主题选择颜色
      const goldColor = this.isDarkMode ? 0xD4AF7A : 0xC5A059;
      const wireframeMaterial = new THREE.LineBasicMaterial({
        color: goldColor,
        transparent: true,
        opacity: 0.6,
        linewidth: 1
      });

      // 1. 二十面体线框（主模型）
      const icosahedronGeometry = new THREE.IcosahedronGeometry(2, 0);
      const icosahedronEdges = new THREE.EdgesGeometry(icosahedronGeometry);
      const icosahedron = new THREE.LineSegments(icosahedronEdges, wireframeMaterial);
      this.scene.add(icosahedron);
      this.objects.push({
        mesh: icosahedron,
        rotationSpeed: { x: 0.002, y: 0.003, z: 0.001 }
      });

      // 2. 八面体线框（左侧）
      const octahedronGeometry = new THREE.OctahedronGeometry(0.8, 0);
      const octahedronEdges = new THREE.EdgesGeometry(octahedronGeometry);
      const octahedron = new THREE.LineSegments(octahedronEdges, wireframeMaterial.clone());
      octahedron.material.opacity = 0.4;
      octahedron.position.set(-3, -1, 2);
      this.scene.add(octahedron);
      this.objects.push({
        mesh: octahedron,
        rotationSpeed: { x: -0.004, y: 0.002, z: 0.003 }
      });

      // 3. 立方体线框（右侧）
      const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
      const boxEdges = new THREE.EdgesGeometry(boxGeometry);
      const box = new THREE.LineSegments(boxEdges, wireframeMaterial.clone());
      box.material.opacity = 0.35;
      box.position.set(3, 1, -1);
      this.scene.add(box);
      this.objects.push({
        mesh: box,
        rotationSpeed: { x: 0.003, y: -0.004, z: 0.002 }
      });

      // 4. 小四面体（装饰）
      const tetrahedronGeometry = new THREE.TetrahedronGeometry(0.5, 0);
      const tetrahedronEdges = new THREE.EdgesGeometry(tetrahedronGeometry);
      const tetrahedron = new THREE.LineSegments(tetrahedronEdges, wireframeMaterial.clone());
      tetrahedron.material.opacity = 0.3;
      tetrahedron.position.set(-2, 2, -2);
      this.scene.add(tetrahedron);
      this.objects.push({
        mesh: tetrahedron,
        rotationSpeed: { x: 0.005, y: 0.002, z: -0.003 }
      });
    }

    bindEvents() {
      // 窗口大小调整
      window.addEventListener('resize', () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      });

      // 鼠标移动
      document.addEventListener('mousemove', (e) => {
        this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      });

      // 触摸移动
      document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
          this.mouseX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
          this.mouseY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
        }
      });
    }

    animate() {
      requestAnimationFrame(() => this.animate());

      // 平滑跟随鼠标
      this.targetRotationY = this.mouseX * 0.5;
      this.targetRotationX = -this.mouseY * 0.3;

      // 旋转所有物体
      this.objects.forEach((obj, index) => {
        const baseSpeed = index === 0 ? 1 : 0.5; // 主物体旋转稍快

        obj.mesh.rotation.x += obj.rotationSpeed.x * baseSpeed + this.targetRotationX * 0.01;
        obj.mesh.rotation.y += obj.rotationSpeed.y * baseSpeed + this.targetRotationY * 0.01;
        obj.mesh.rotation.z += obj.rotationSpeed.z * baseSpeed;
      });

      // 渲染
      this.renderer.render(this.scene, this.camera);
    }
  }

  // DOM 加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      new WireframeScene('particles-canvas');
    });
  } else {
    new WireframeScene('particles-canvas');
  }

})();
