# 🚨 如何添加 Logo - 详细步骤

## 问题说明
你上传的 logo 图片需要手动保存到项目的 public 文件夹中。

## 📋 详细步骤

### 方法 1：直接保存（推荐）

1. **右键点击你上传的 Anime Weapons logo 图片**
2. **选择"另存为..." 或 "Save Image As..."**
3. **保存位置选择**：
   ```
   /Users/zero/Documents/websites/animeweapons.org/public/
   ```
4. **文件名必须是**：`logo.png`
5. **保存**

### 方法 2：使用终端命令

如果你的图片已经下载到桌面，在终端运行：

```bash
# 从桌面复制到 public 文件夹
cp ~/Desktop/anime-weapons-logo.png /Users/zero/Documents/websites/animeweapons.org/public/logo.png

# 或者如果文件名不同，调整这个命令
cp ~/Desktop/你的图片名称.png /Users/zero/Documents/websites/animeweapons.org/public/logo.png
```

### 方法 3：使用 Finder

1. 打开 Finder
2. 导航到：`/Users/zero/Documents/websites/animeweapons.org/public/`
3. 将 logo 图片拖放到这个文件夹
4. 确保文件名改为 `logo.png`

## ✅ 验证步骤

保存后，在终端运行：
```bash
ls -la /Users/zero/Documents/websites/animeweapons.org/public/
```

你应该看到：
```
-rw-r--r--  1 zero  staff  xxxxx  Nov 23 xx:xx logo.png
```

## 🔄 之后的步骤

1. **重启开发服务器**：
   ```bash
   # 如果正在运行，按 Ctrl+C 停止
   # 然后重新运行
   npm run dev
   ```

2. **清除浏览器缓存**：
   - Mac: `Cmd + Shift + R`
   - Windows: `Ctrl + Shift + R`

3. **刷新页面**，logo 应该就会显示了！

## 📝 注意事项

- ✅ 文件名必须是 `logo.png`（小写）
- ✅ 文件必须在 `public` 文件夹
- ✅ 推荐图片尺寸：至少 512x512px
- ✅ 格式：PNG（支持透明背景）

## 🐛 如果还是不显示

1. 检查文件路径：
   ```bash
   ls -la /Users/zero/Documents/websites/animeweapons.org/public/logo.png
   ```

2. 检查文件大小：
   ```bash
du -h /Users/zero/Documents/websites/animeweapons.org/public/logo.png
   ```

3. 查看开发服务器日志是否有错误

## 当前代码已经准备好

✅ Header 组件已配置读取 `/logo.png`
✅ 如果图片不存在，会自动隐藏（不显示错误图标）
✅ 如果图片存在，会自动显示

**你只需要把图片文件放到正确位置即可！**
