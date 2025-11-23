# Hướng dẫn Build và Deploy Schema lên MongoDB

## 📋 Yêu cầu

1. MongoDB database (local hoặc cloud như MongoDB Atlas)
2. Node.js và npm đã cài đặt
3. File `.env.local` hoặc `.env` với `DATABASE_URL`

## 🔧 Bước 1: Cấu hình Environment Variables

Tạo file `.env.local` trong thư mục root của project:

```env
# MongoDB Connection String
DATABASE_URL="mongodb://localhost:27017/chung-portfolio"

# Hoặc MongoDB Atlas (Cloud)
# DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/chung-portfolio?retryWrites=true&w=majority"

# JWT Secret (cho authentication)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# EmailJS (cho contact form)
NEXT_PUBLIC_EMAILJS_SERVICE_ID="your-service-id"
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="your-template-id"
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="your-public-key"
```

### Lấy MongoDB Connection String:

**Local MongoDB:**
```
mongodb://localhost:27017/chung-portfolio
```

**MongoDB Atlas (Cloud):**
1. Đăng ký tại [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Tạo cluster mới
3. Tạo database user
4. Whitelist IP address (0.0.0.0/0 cho development)
5. Copy connection string và thay `<password>` bằng password của bạn

## 🚀 Bước 2: Generate Prisma Client

Generate Prisma Client từ schema mới:

```bash
npm run prisma:generate
```

Hoặc:

```bash
npx prisma generate
```

## 📤 Bước 3: Push Schema lên MongoDB

Push schema lên MongoDB database (tạo collections và indexes):

```bash
npm run prisma:push
```

Hoặc:

```bash
npx prisma db push
```

**Lưu ý:** 
- `db push` sẽ tạo/update schema trực tiếp lên database
- Phù hợp cho development và prototyping
- Không tạo migration history

**Nếu muốn dùng Migrations (production):**
```bash
npx prisma migrate dev --name init
```

## 🌱 Bước 4: Seed Database (Tùy chọn)

Chạy seed để tạo dữ liệu mẫu (admin user, default user):

```bash
npm run prisma:seed
```

Hoặc:

```bash
npx prisma db seed
```

## ✅ Bước 5: Verify

Kiểm tra database đã được tạo đúng:

```bash
npm run prisma:studio
```

Prisma Studio sẽ mở tại `http://localhost:5555` - bạn có thể xem và quản lý data trực tiếp.

## 🔍 Kiểm tra Collections

Sau khi push, MongoDB sẽ có các collections sau:

- `users` - User profiles
- `admins` - Admin accounts
- `social_links` - Social media links
- `projects` - Portfolio projects
- `project_tags` - Project tags
- `experiences` - Work experiences
- `tech_stacks` - Technology stacks
- `experience_tech_stacks` - Experience-TechStack relations
- `project_tech_stacks` - Project-TechStack relations
- `educations` - Education records
- `certificates` - Certificates
- `degrees` - Degrees
- `skills` - Skills catalog
- `user_skills` - User-Skill relations
- `contacts` - Contact messages

## 🛠️ Troubleshooting

### Lỗi: "Environment variable not found: DATABASE_URL"
- Kiểm tra file `.env.local` đã tồn tại
- Đảm bảo `DATABASE_URL` đã được set đúng

### Lỗi: "Authentication failed"
- Kiểm tra username/password trong connection string
- Kiểm tra IP whitelist (nếu dùng MongoDB Atlas)

### Lỗi: "Cannot connect to MongoDB"
- Kiểm tra MongoDB service đang chạy (local)
- Kiểm tra network connection (cloud)
- Kiểm tra connection string format

### Reset Database (Xóa tất cả data):
```bash
npx prisma db push --force-reset
```

⚠️ **CẢNH BÁO:** Lệnh này sẽ xóa TẤT CẢ data trong database!

## 📝 Scripts có sẵn

```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema lên database
npm run prisma:push

# Seed database với dữ liệu mẫu
npm run prisma:seed

# Mở Prisma Studio (GUI để xem data)
npm run prisma:studio
```

## 🎯 Workflow đề xuất

1. **Development:**
   ```bash
   npm run prisma:generate
   npm run prisma:push
   npm run prisma:seed
   ```

2. **Production:**
   ```bash
   npm run prisma:generate
   npx prisma migrate deploy
   ```

## 📚 Tài liệu tham khảo

- [Prisma MongoDB Guide](https://www.prisma.io/docs/concepts/database-connectors/mongodb)
- [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)

