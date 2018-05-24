# ReactJS App

```shell
    npm start <- Start development mode
    npm run build <- Build app
```
# Các bước tạo
## Tạo một React js app
### 1. Tạo thư mục và cd vào thư mục đó.
```shell
    mkdir my-app
    cd my-app
```
	
### 2. Tạo package.json file.
```shell
        npm init -y
```
	
### 3. Cài đặt webpack và webpack-cli
```shell
    npm install webpack webpack-cli -D (-D = --save-dev)
```

### 4. Tạo thư mục src và thêm file index.js
### 5. Thêm scripts vào file package.json
    scripts: {
        start: "webpack --mode development"
        build: "webpack --mode production"
    }
### 6. Thử chạy script.
-Sau khi chạy script "npm start", webpack sẽ tạo ra thư mục dist có chứa một file main.js bên trong. (mở file sẽ thấy dòng code tại file index.js trong thư mục src đã tạo ở bước 4). Code này chưa được minify
-Còn sau khi chạy script "npm run build", webpack cũng sẽ tạo ra các file và thư mục tương tự như khi chạy script "npm start" nhưng code trong file main.js mà webpack tạo ra đã được minify

### 7. Để làm việc với react, ta cần cài đặt nó với babel. Babel sẽ chuyển đổi mã code từ es6 sang es5 để ứng dụng của ta sẽ chạy được ở các loại browser khác nhau vì đa số các browser chưa hỗ trợ es6.
Cài đặt react và react-dom
```shell
    npm install react react-dom -S (-S = --save)
```
		
Sau đó cài đặt babel-core, babel-loader, babel-preset-env, babel-preset-react
```shell
    npm install babel-core babel-loader babel-preset-env babel-preset-react -D
```
-babel-core - chuyển code từ es6 về es5
-babel-loader - trình trợ giúp của webpack để dịch code từ các file import của bạn. Ví dụ khi bạn import component A vào component B. babel-loader có thể dịch cả code từ trong component A.



### 8. Tạo file webpack.config.js
    module.exports = {
        module: {
            rules: [
                {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
                }
            ]
        }
    };

webpack sẽ kiểm tra tất cả các file có phần mở rộng .js và tìm đến file có trên .babelrc để đọc cấu hình babel và bắt đầu bunder code của chúng ta.
Tạo file .babelrc 
```shell
    {
        "presets": ["env", "react"]
    }
```
    
### 9. Thay đổi file index.js trong thư mục src để hiển thị một component
	import React from "react";
	import ReactDOM from "react-dom";

	const Index = () => {
	  return <div>Hello React!</div>;
	};

	ReactDOM.render(<Index />, document.getElementById("index"));

### 10. Tạo file index.html trong thư mục src
	<!DOCTYPE html>
	<html>

	<head>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <meta http-equiv="X-UA-Compatible" content="ie=edge">
	    <title>React and Webpack4</title>
	</head>

	<body>
	    <section id="index"></section>
	</body>

	</html>

### 11. Cài đặt html-webpack-plugin
Plugin này sẽ tạo ra một file index.html trong thư mục dist. File html này đã được nhúng sẵn script mà webpack đã bunder ra.

Sửa file webpack.config.js

    const HtmlWebPackPlugin = require("html-webpack-plugin");

    const htmlPlugin = new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
    });

    module.exports = {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                }
            ]
        },
        plugins: [htmlPlugin]
    };

giá trị của "template" là file html đầu vào, "filename" là file html đã được minify

### 12. Cài đặt webpack-dev-server
```shell
    npm install webpack-dev-server -D
```
	
Cài đặt thư viện này để webpack có thể nhận biết những thay đổi trong code và bunder lại mà không cần phải chạy lại script
Sau đó thay đổi lại srcipt start như sau:
		start: "webpack-dev-server --mode development --open".
Chạy lại script npm start sẽ thấy browser tự động mở một tab mới và truy cập http://localhost:8080. Đây là những gì mà cờ --open làm. Bây giờ, mỗi khi thay đổi code, trang sẽ tự động được làm mới.
Bạn có thể thêm cờ --hot vào sau script start để chỉ tải lại những thành phần bạn đã thay đổi thay vì tải lại toàn bộ trang

### 13. Cài đặt css-loader
Chúng ta cần css-loader để có thể import các file css vào trong các component của mình. Khi chúng ta đã có thể import các css file vào component rồi thì chúng ta sẽ cần thêm style-loader để có thể thêm các thẻ ```<style>``` bên trong thẻ head trên html. 
Chúng ta cần cài thêm 2 thư viện css-loader và style-loader
```shell
    npm install css-loader style-loader -D
```

Sau đó sửa file webpack.config.js như sau
		const HtmlWebPackPlugin = require("html-webpack-plugin");

		const htmlPlugin = new HtmlWebPackPlugin({
		    template: "./src/index.html",
		    filename: "./index.html"
		});

		module.exports = {
		    module: {
		        rules: [
		            {
		                test: /\.js$/,
		                exclude: /node_modules/,
		                use: {
		                    loader: "babel-loader"
		                }
		            },
		            {
		                test: /\.css$/,
		                use: ["style-loader", "css-loader"]
		            }
		        ]
		    },
		    plugins: [htmlPlugin]
		};

-Lưu ý: Thứ tự thêm các loader này là quan trọng. Chúng ta cần giải quyết các file css trước khi thêm chúng vào DOM với style-loader. Theo mặc định webpack sẽ sử dụng các loader từ phải sang trái (cuối mảng tới đầu mảng)  (ví dụ:  use: ["style-loader", "css-loader"]  <= sử dụng css-loader trước sau đó sử dụng style-loader )


