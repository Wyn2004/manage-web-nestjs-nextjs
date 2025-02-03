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
4. Tạo 1 resource modal user từ lệnh nest
   (Chỉnh lại thư viện "@nestjs/mapped-types": "2.1.0" theo đúng version hiện tại)
   nest g resource users --no-spec
   https://docs.nestjs.com/recipes/crud-generator
5. Cài đặt thư viện config
   npm install --save-exact @nestjs/config@4.0.0
6. Cài đặt thư viện validation
   npm i --save-exact class-validator@0.14.1 class-transformer@0.5.1
   cấu hình global ở app.module.ts
7. Cài debug như trên
8. Cài bcrypt để hash password
   npm i --save-exact bcrypt@5.1.1
   npm i --save-dev @types/bcrypt
9. Cài đặt jwt
   npm i --save-exact @nestjs/jwt@11.0.0
10. Cài đặt passport
    npm install --save-exact @nestjs/passport@11.0.5 passport@0.7.0 passport-local@1.0.0
    npm install --save-dev @types/passport-local@1.0.38
11. Cài đặt JWT passport
    npm install --save-exact passport-jwt@4.0.1
    npm install --save-dev @types/passport-jwt@4.0.1

--- Databse

12. Cài đặt thư viện mongoose
    npm i @nestjs/mongoose@11.0.0
    (Config lại ở file app.module.ts)
    https://docs.nestjs.com/techniques/mongodb
13. Cài thư viện để lấy param mongoDb
    npm i --save-exact api-query-params@5.4.0
