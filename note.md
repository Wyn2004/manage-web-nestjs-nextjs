--- NextJs

1. Cài đặt nextjs app
   npx create-next-app@latest
2. Cài đặt thư viện antd
3. Cài đặt thư viện @ant-design/nextjs-registry để đăng kí sử dụng thư viện antd

--- NestJs

1. Cài đặt nestjs ( nếu chưa cài )
   npm i --save-exact -g @nestjs/cli@10.4.9
2. New project
   nest new 02-nest-rm
3. Cài thư viện dotenv  
   npm i dotenv
4. Tạo 1 resource modal u7ser từ lệnh nest
   (Chỉnh lại thư viện "@nestjs/mapped-types": "2.1.0" theo đúng version hiện tại)
   nest g resource users --no-spec
   https://docs.nestjs.com/recipes/crud-generator
5. Cài đặt thư viện config
   npm install --save-exact @nestjs/config@4.0.0

--- Databse

1. Cài đặt thư viện mongoose
   npm i @nestjs/mongoose@11.0.0
   (Config lại ở file app.module.ts)
   https://docs.nestjs.com/techniques/mongodb
