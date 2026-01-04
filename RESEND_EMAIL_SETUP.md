# 📧 Hướng dẫn Setup Resend Email Service

## ✅ Đã hoàn thành

1. ✅ Cập nhật Prisma schema: Thêm `firstname`, `lastname`, `service` vào model `Contact`
2. ✅ Cài đặt Resend package
3. ✅ Tạo API route `/api/user/contact` để lưu vào DB và gửi email
4. ✅ Tạo utility `lib/resend.js` để gửi email qua Resend
5. ✅ Cập nhật `lib/email.js` để gọi API với Resend
6. ✅ Xóa EmailJS package và tất cả references

---

## 🔧 Bước 1: Tạo tài khoản Resend

1. Truy cập [https://resend.com](https://resend.com)
2. Đăng ký tài khoản miễn phí (3,000 emails/tháng)
3. Verify email của bạn

---

## 🔑 Bước 2: Lấy API Key

1. Vào **Dashboard** → **API Keys**
2. Click **Create API Key**
3. Đặt tên (ví dụ: `Portfolio Contact Form`)
4. Chọn **Sending access** (Full access)
5. Copy API Key (chỉ hiện 1 lần, lưu lại ngay!)

---

## 📧 Bước 3: Verify Domain hoặc dùng Email Test

### Option 1: Dùng Email Test (Nhanh - cho development)

Resend cung cấp domain test: `onboarding@resend.dev`

- **From email**: `onboarding@resend.dev` (mặc định)
- **To email**: Email của bạn (để nhận contact form)

### Option 2: Verify Domain (Production - Recommended)

1. Vào **Domains** → **Add Domain**
2. Thêm domain của bạn (ví dụ: `yourdomain.com`)
3. Thêm DNS records theo hướng dẫn:
   - TXT record cho verification
   - SPF record
   - DKIM records
4. Sau khi verify xong, dùng email từ domain đó

---

## 🔐 Bước 4: Cấu hình Environment Variables

### 4.1. Local Development (`.env.local`)

Thêm vào file `.env.local`:

```env
# Resend Email Configuration
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=onboarding@resend.dev
CONTACT_RECIPIENT_EMAIL=your-email@example.com
```

**Giải thích:**
- `RESEND_API_KEY`: API key từ Resend dashboard
- `RESEND_FROM_EMAIL`: Email gửi đi (dùng `onboarding@resend.dev` cho test, hoặc email từ domain đã verify)
- `CONTACT_RECIPIENT_EMAIL`: Email nhận contact form (thường là email của bạn)

### 4.2. Vercel Production

1. Vào **Vercel Dashboard** → **Project** → **Settings** → **Environment Variables**
2. Thêm các biến sau (chọn cả 3 environments: Production, Preview, Development):

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=onboarding@resend.dev (hoặc your-email@yourdomain.com)
CONTACT_RECIPIENT_EMAIL=your-email@example.com
```

3. Click **Save**
4. **Redeploy** project để apply changes

---

## 🗄️ Bước 5: Chạy Prisma Migration

### 5.1. Generate Prisma Client

```bash
npx prisma generate
```

### 5.2. Push Schema Changes (Development)

```bash
npx prisma db push
```

**Lưu ý:** Nếu dùng MongoDB, Prisma sẽ tự động sync schema, không cần migration file.

### 5.3. Kiểm tra Schema

Mở Prisma Studio để xem model Contact:

```bash
npx prisma studio
```

---

## 🧪 Bước 6: Test Contact Form

1. Chạy dev server:
   ```bash
   npm run dev
   ```

2. Vào [http://localhost:3000/contact](http://localhost:3000/contact)

3. Điền form và submit

4. Kiểm tra:
   - ✅ Form submit thành công
   - ✅ Toast hiện "Awesome! Your message is on its way..."
   - ✅ Email được gửi đến `CONTACT_RECIPIENT_EMAIL`
   - ✅ Contact được lưu vào database

5. Kiểm tra Database:
   ```bash
   npx prisma studio
   ```
   Vào collection `contacts` để xem contact mới

---

## 📊 Bước 7: Kiểm tra Email trong Resend Dashboard

1. Vào **Resend Dashboard** → **Logs**
2. Xem email đã được gửi chưa
3. Nếu có lỗi, xem error message

---

## 🔍 Troubleshooting

### Lỗi 1: "RESEND_API_KEY is not configured"

**Nguyên nhân:** Environment variable chưa được set

**Cách fix:**
- Kiểm tra `.env.local` có `RESEND_API_KEY` chưa
- Restart dev server sau khi thêm env vars
- Trên Vercel: Đảm bảo đã thêm và redeploy

### Lỗi 2: "Invalid API key"

**Nguyên nhân:** API key sai hoặc đã bị revoke

**Cách fix:**
- Tạo API key mới trong Resend dashboard
- Cập nhật `RESEND_API_KEY` trong env vars

### Lỗi 3: "Domain not verified"

**Nguyên nhân:** Dùng email từ domain chưa verify

**Cách fix:**
- Dùng `onboarding@resend.dev` cho development
- Hoặc verify domain trong Resend dashboard

### Lỗi 4: Email không được gửi nhưng contact đã lưu vào DB

**Nguyên nhân:** Email service lỗi nhưng API vẫn lưu contact (đúng behavior)

**Cách fix:**
- Kiểm tra Resend logs
- Kiểm tra `RESEND_API_KEY` và `RESEND_FROM_EMAIL`
- Contact vẫn được lưu, chỉ cần fix email service

### Lỗi 5: Prisma generate permission error

**Nguyên nhân:** File đang được sử dụng

**Cách fix:**
- Đóng tất cả processes đang dùng Prisma (VS Code, Prisma Studio, etc.)
- Chạy lại: `npx prisma generate`
- Hoặc restart máy tính

---

## 📝 Schema Changes

Model `Contact` đã được cập nhật với các fields mới:

```prisma
model Contact {
  id        String        @id @default(auto()) @map("_id") @db.ObjectId
  userId    String        @db.ObjectId
  firstname String        // NEW
  lastname  String        // NEW
  name      String        // Full name (backward compatibility)
  email     String
  phone     String?
  service   String?       // NEW: 'fe', 'be', 'fs'
  message   String        @db.String
  status    ContactStatus @default(pending)
  reply     String?       @db.String
  repliedAt DateTime?
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  
  @@index([userId])
  @@index([userId, status])
  @@index([status])
  @@index([createdAt])
  @@map("contacts")
}
```

---

## 🎯 Next Steps (Optional)

1. **Tạo Admin Panel** để xem và quản lý contacts:
   - List contacts với status filter
   - Mark as read/replied
   - Reply to contact

2. **Email Templates**: Customize email template trong `lib/resend.js`

3. **Rate Limiting**: Thêm rate limiting để chống spam

4. **Email Notifications**: Gửi auto-reply cho người gửi

---

## 📚 Tài liệu tham khảo

- [Resend Documentation](https://resend.com/docs)
- [Resend API Reference](https://resend.com/docs/api-reference)
- [Prisma MongoDB Guide](https://www.prisma.io/docs/concepts/database-connectors/mongodb)

---

**Sau khi setup xong, test contact form và kiểm tra email! 🚀**

