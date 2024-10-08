# Node.js Image Downloader

This project includes a Node.js script for downloading images from a list of URLs and saving them into a nested folder structure. It handles creating necessary directories and logging any failed downloads.

## Features

- Downloads images from a list of URLs specified in the `images.js` file.
- Saves images into a nested folder structure based on the URL path.
- Logs failed downloads to a text file (`data.txt`).

## Files

### 1. index.js

This script:

- Reads a list of image URLs from `images.js`.
- Downloads each image asynchronously.
- Creates necessary folders to save images.
- Logs any failed downloads to `data.txt`.

#### Usage

1. Create an `images.js` file in the same directory as `index.js` and export an array of image URLs:
   ```js
   module.exports = [
     "https://example.com/path/to/image1.jpg",
     "https://example.com/path/to/image2.jpg",
     // Add more URLs as needed
   ];
   ```

### Phiên bản tiếng Việt

````markdown
# Trình Tải Ảnh Node.js

Dự án này bao gồm một script Node.js để tải ảnh từ danh sách các URL và lưu chúng vào cấu trúc thư mục lồng nhau. Nó xử lý việc tạo các thư mục cần thiết và ghi lại bất kỳ tải xuống nào không thành công.

## Tính Năng

- Tải ảnh từ danh sách các URL được chỉ định trong tệp `images.js`.
- Lưu ảnh vào cấu trúc thư mục lồng nhau dựa trên đường dẫn URL.
- Ghi lại các tải xuống không thành công vào tệp văn bản (`data.txt`).

## Các Tệp

### 1. index.js

Script này:

- Đọc danh sách các URL ảnh từ `images.js`.
- Tải mỗi ảnh một cách bất đồng bộ.
- Tạo các thư mục cần thiết để lưu ảnh.
- Ghi lại các tải xuống không thành công vào `data.txt`.

#### Cách Sử Dụng

1. Tạo một tệp `images.js` cùng thư mục với `index.js` và xuất một mảng các URL ảnh:
   ```js
   module.exports = [     "https://example.com/path/to/image1.jpg",     "https://example.com/path/to/image2.jpg",     // Thêm các URL khác nếu cần   ];
   ```
````
