---
toc_depth: 3
---

# 网站构建说明书

## 自定义主题说明

本网站使用了 [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) 主题，可以通过配置文件夹`/overrides`中的文件对主题进行定制化修改。

基本已经在`mkdocs.yml`中设置：
```yaml
theme:
  name: material
  custom_dir: overrides
```

具体参见 [Material for MkDocs - Customization](https://squidfunk.github.io/mkdocs-material/customization/)。


## Features

### comments

启用评论功能，可以通过在markdown文件的YAML头信息中设置`comments: true`来启用。例如：

```markdown
---
comments: true
---
```
表示该文档启用评论功能。


### TOC

#### 选择是否显示右侧边栏的目录

可以通过在markdown文件的YAML头信息中设置`toc: false`来关闭右侧边栏目录的显示。例如：

```markdown
---
toc: false
---
```

表示该文档不显示右侧边栏目录。

#### toc_depth 自定义TOC显示深度

单个文档侧边栏显示目录的层级数，可以通过在markdown文件的YAML头信息中设置`toc_depth`来控制。例如：

```markdown
---
toc_depth: 3
---
```
表示该文档的侧边栏目录将显示到三级标题（###）。

### Admonitions

在文档中使用Admonitions（警告框）来突出显示重要信息、提示或注意事项。例如：

!!! note "注意"

    这是一个警告框，提醒读者注意某些重要信息。

!!! warning "注意"

    这是一个警告框，提醒读者注意某些重要信息。

!!! tip "提示"

    这是一个提示框，提供有用的建议或信息。

!!! success "成功"

    这是一个成功框，表示某个操作或步骤已成功完成。

上面三个警告框对应下面的Markdown代码：

```markdown
!!! note "注意"

    这是一个警告框，提醒读者注意某些重要信息。

!!! warning "注意"

    这是一个警告框，提醒读者注意某些重要信息。

!!! tip "提示"

    这是一个提示框，提供有用的建议或信息。

!!! success "成功"

    这是一个成功框，表示某个操作或步骤已成功完成。

```
具体可见 [Admonitions](https://squidfunk.github.io/mkdocs-material/reference/admonitions/?h=admonitions)
