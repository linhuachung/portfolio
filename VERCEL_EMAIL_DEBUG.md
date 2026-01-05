# Vercel Email Debugging Guide

## Vấn đề phát hiện từ Vercel Dashboard

### 1. **DATABASE_URL chỉ có cho Preview Environment** ⚠️
- **Vấn đề**: `DATABASE_URL` chỉ được config cho "Preview", không có cho "Production"
- **Ảnh hưởng**: Code không thể kết nối database để lấy `user.email` làm fallback
- **Giải pháp**: Thêm `DATABASE_URL` cho Production environment

### 2. **Environment Variables cần thiết**

Đảm bảo các biến sau có cho **Production** (không chỉ Preview):

#### Bắt buộc:
- ✅ `RESEND_API_KEY` - Đã có cho "All Environments"
- ✅ `RESEND_FROM_EMAIL` - Đã có cho "All Environments"  
- ✅ `NEXT_PUBLIC_BASE_URL` - Đã có cho "All Environments"
- ⚠️ `DATABASE_URL` - **CHỈ CÓ cho Preview** → Cần thêm cho Production
- ⚠️ `CONTACT_RECIPIENT_EMAIL` - Đã có cho "All Environments" (OK)

#### Optional nhưng nên có:
- `JWT_SECRET` - Nếu có authentication
- `JWT_REFRESH_SECRET` - Nếu có refresh token

### 3. **Domain Verification trong Resend**

Kiểm tra trong [Resend Dashboard](https://resend.com/domains):
- Domain `chunglh.com` đã được verify chưa?
- DKIM, SPF, DMARC records đã được setup đúng chưa?
- `RESEND_FROM_EMAIL` phải match với verified domain

### 4. **Debugging Steps**

#### Step 1: Kiểm tra Vercel Logs
1. Vào Vercel Dashboard → Project → Deployments
2. Click vào deployment mới nhất
3. Xem tab "Functions" → Click vào function `/api/user/contact`
4. Xem logs để tìm error messages

#### Step 2: Kiểm tra Environment Variables
```bash
# Trong Vercel Dashboard → Settings → Environment Variables
# Đảm bảo các biến sau có cho Production:

RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=noreply@chunglh.com
NEXT_PUBLIC_BASE_URL=https://www.chunglh.com
DATABASE_URL=mongodb+srv://...  # ⚠️ QUAN TRỌNG: Thêm cho Production
CONTACT_RECIPIENT_EMAIL=your-email@example.com
```

#### Step 3: Test API trực tiếp
```bash
# Test contact form API
curl -X POST https://www.chunglh.com/api/user/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstname": "Test",
    "lastname": "User",
    "email": "test@example.com",
    "phone": "1234567890",
    "service": "fe",
    "message": "Test message"
  }'
```

#### Step 4: Kiểm tra Resend Dashboard
1. Vào [Resend Dashboard](https://resend.com/emails)
2. Xem tab "Emails" để check:
   - Email có được gửi không?
   - Nếu có, status là gì? (sent, delivered, bounced, failed)
   - Nếu failed, error message là gì?

### 5. **Common Issues & Solutions**

#### Issue 1: "RESEND_API_KEY is not configured"
- **Nguyên nhân**: Env variable không được load
- **Giải pháp**: 
  - Đảm bảo variable name đúng: `RESEND_API_KEY` (không có space)
  - Redeploy sau khi thêm env variable
  - Check "All Environments" được chọn

#### Issue 2: "RESEND_FROM_EMAIL is not configured"
- **Nguyên nhân**: Tương tự Issue 1
- **Giải pháp**: Thêm `RESEND_FROM_EMAIL` cho Production

#### Issue 3: "User not found" hoặc Database connection error
- **Nguyên nhân**: `DATABASE_URL` không có cho Production
- **Giải pháp**: Thêm `DATABASE_URL` cho Production environment

#### Issue 4: "Domain not verified" error từ Resend
- **Nguyên nhân**: Domain chưa được verify trong Resend
- **Giải pháp**: 
  - Vào Resend Dashboard → Domains
  - Verify domain `chunglh.com`
  - Setup DNS records (DKIM, SPF, DMARC)

#### Issue 5: Email được gửi nhưng không nhận được
- **Nguyên nhân**: 
  - Email vào spam folder
  - Domain chưa được verify
  - DNS records chưa đúng
- **Giải pháp**:
  - Check spam folder
  - Verify domain trong Resend
  - Check DNS records

### 6. **Code Error Handling**

Code hiện tại có error handling tốt:
- Try-catch trong `sendContactEmail()`
- Log errors ra console
- Không fail request nếu email fail (contact vẫn được save)

**Nhưng**: Errors chỉ log ra `console.error()`, cần check Vercel logs để thấy.

### 7. **Quick Fix Checklist**

- [ ] Thêm `DATABASE_URL` cho Production environment trong Vercel
- [ ] Verify domain `chunglh.com` trong Resend Dashboard
- [ ] Check DNS records (DKIM, SPF, DMARC) cho domain
- [ ] Redeploy sau khi thêm env variables
- [ ] Test contact form trên production site
- [ ] Check Vercel logs để xem errors
- [ ] Check Resend Dashboard để xem email status

### 8. **Test Script**

Tạo file test để verify env variables:

```javascript
// app/api/test-env/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  const envCheck = {
    RESEND_API_KEY: !!process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: !!process.env.RESEND_FROM_EMAIL,
    NEXT_PUBLIC_BASE_URL: !!process.env.NEXT_PUBLIC_BASE_URL,
    DATABASE_URL: !!process.env.DATABASE_URL,
    CONTACT_RECIPIENT_EMAIL: !!process.env.CONTACT_RECIPIENT_EMAIL,
    // Don't expose actual values
    RESEND_FROM_EMAIL_VALUE: process.env.RESEND_FROM_EMAIL ? 'Set' : 'Not Set',
    NEXT_PUBLIC_BASE_URL_VALUE: process.env.NEXT_PUBLIC_BASE_URL || 'Not Set'
  };

  return NextResponse.json(envCheck);
}
```

Truy cập: `https://www.chunglh.com/api/test-env` để check.

