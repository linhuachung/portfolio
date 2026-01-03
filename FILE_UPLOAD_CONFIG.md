# File Upload Configuration - AWS S3

## 📋 Tổng quan

Hệ thống hỗ trợ upload CV lên **AWS S3** (Amazon Simple Storage Service) thay vì lưu trong source code. Điều này giúp:
- ✅ File không chiếm dung lượng trong code repository
- ✅ Dễ dàng quản lý và backup
- ✅ Có thể scale khi có nhiều file
- ✅ Có thể sử dụng CDN (CloudFront) để tăng tốc độ tải

## 🎯 Mục tiêu

Sau khi hoàn thành hướng dẫn này, bạn sẽ:
1. Có tài khoản AWS và S3 bucket
2. Cấu hình được credentials trong project
3. Upload và download file CV thành công
4. Hiểu cách sử dụng API để upload file

---

## 📝 Bước 1: Tạo tài khoản AWS (Nếu chưa có)

### 1.1. Đăng ký AWS Account

1. Truy cập: https://aws.amazon.com/
2. Click **"Create an AWS Account"** hoặc **"Sign In to the Console"**
3. Điền thông tin và xác thực email/phone
4. **Lưu ý**: AWS có free tier, nhưng cần thẻ tín dụng để xác thực (sẽ không bị charge nếu dùng trong free tier)

### 1.2. Đăng nhập AWS Console

1. Sau khi đăng ký, truy cập: https://console.aws.amazon.com/
2. Đăng nhập bằng email và password vừa tạo

---

## 🔑 Bước 2: Tạo IAM User (Để lấy Access Key)

**IAM (Identity and Access Management)** là dịch vụ quản lý quyền truy cập của AWS. Chúng ta sẽ tạo một user riêng để upload file, không dùng root account (bảo mật hơn).

### 2.1. Tạo IAM User

1. Trong AWS Console, tìm và click vào **"IAM"** (hoặc search "IAM" ở thanh tìm kiếm)
2. Ở menu bên trái, click **"Users"**
3. Click nút **"Create user"** (màu xanh ở góc trên bên phải)

### 2.2. Đặt tên User

1. Ở tab **"Specify user details"**:
   - **User name**: Nhập tên (ví dụ: `portfolio-uploader`)
   - **AWS credential type**: Chọn **"Access key - Programmatic access"** (để lấy Access Key ID và Secret Key)
2. Click **"Next"**

### 2.3. Gán quyền (Permissions)

1. Ở tab **"Set permissions"**, chọn **"Attach policies directly"**
2. Tìm và chọn policy: **"AmazonS3FullAccess"**
   - **Lưu ý**: Policy này cho full quyền S3. Ở phần sau sẽ hướng dẫn tạo policy hạn chế hơn (recommended)
3. Click **"Next"** → **"Create user"**

### 2.4. Lưu Access Keys (QUAN TRỌNG - chỉ hiện 1 lần)

1. Sau khi tạo user, bạn sẽ thấy màn hình **"Retrieve access keys"**
2. **QUAN TRỌNG**: Click **"Show"** để xem Secret Access Key và **SAVE NGAY** vào file text an toàn
3. Bạn sẽ có 2 thông tin:
   - **Access Key ID**: Ví dụ: `AKIAXXXXXXXXXXXXXXXX`
   - **Secret Access Key**: Ví dụ: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
4. **Lưu ý**: Nếu mất Secret Access Key, bạn phải tạo lại (không thể xem lại được)

---

## 🪣 Bước 3: Tạo S3 Bucket

**S3 Bucket** là nơi lưu trữ file. Mỗi bucket có tên unique toàn cầu.

### 3.1. Tạo Bucket

1. Trong AWS Console, tìm và click **"S3"** (hoặc search "S3")
2. Click nút **"Create bucket"** (màu cam ở góc trên bên phải)

### 3.2. Cấu hình Bucket

1. **Tab "General configuration"**:
   - **Bucket name**: Nhập tên bucket (phải unique toàn cầu, ví dụ: `my-portfolio-2024-cv`)
   - **AWS Region**: Chọn region gần bạn (ví dụ: `ap-southeast-2` cho Singapore, `us-east-1` cho US)
   - **Lưu ý**: Ghi nhớ region này, sẽ cần dùng trong `.env`

2. **Tab "Object Ownership"**:
   - Giữ mặc định: **"ACLs disabled (recommended)"**

3. **Tab "Block Public Access settings"**:
   - **QUAN TRỌNG**: Bỏ check tất cả 4 options:
     - ☐ Block all public access
     - ☐ Block public access to buckets and objects granted through new access control lists (ACLs)
     - ☐ Block public access to buckets and objects granted through any access control lists (ACLs)
     - ☐ Block public access to buckets and objects granted through new public bucket or access point policies
     - ☐ Block public and cross-account access to buckets and objects through any public bucket or access point policies
   - Sẽ có cảnh báo, click **"I acknowledge..."** và **"Create bucket"**

4. Click **"Create bucket"** ở cuối trang

---

## 🔐 Bước 4: Cấu hình Bucket Policy (Cho phép download file)

**Bucket Policy** là quy tắc cho phép ai có thể truy cập file trong bucket.

### 4.1. Thêm Bucket Policy

1. Trong S3, click vào tên bucket vừa tạo
2. Click tab **"Permissions"**
3. Scroll xuống phần **"Bucket policy"**
4. Click **"Edit"** → **"Policy editor"**

### 4.2. Dán Policy

Copy và dán policy sau vào editor (thay `your-bucket-name` bằng tên bucket của bạn):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/resume/*"
    }
  ]
}
```

**Giải thích**:
- `"Principal": "*"`: Cho phép tất cả mọi người
- `"Action": "s3:GetObject"`: Cho phép đọc (download) file
- `"Resource": "arn:aws:s3:::your-bucket-name/resume/*"`: Chỉ áp dụng cho folder `resume/` trong bucket

5. Click **"Save changes"**

---

## 🌐 Bước 5: Cấu hình CORS (Cho phép download từ browser)

**CORS (Cross-Origin Resource Sharing)** cho phép website của bạn fetch file từ S3 trong browser.

### 5.1. Thêm CORS Configuration

1. Vẫn ở tab **"Permissions"** của bucket
2. Scroll xuống phần **"Cross-origin resource sharing (CORS)"**
3. Click **"Edit"**

### 5.2. Dán CORS Configuration

Copy và dán cấu hình sau:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["Content-Length", "Content-Type", "Content-Disposition"],
    "MaxAgeSeconds": 3000
  }
]
```

**Giải thích**:
- `"AllowedOrigins": ["*"]`: Cho phép tất cả domains (development)
- `"AllowedMethods": ["GET", "HEAD"]`: Cho phép đọc file
- `"ExposeHeaders"`: Cho phép browser đọc các headers này

**Lưu ý bảo mật**: Trong production, thay `"*"` bằng domain cụ thể:
```json
"AllowedOrigins": ["https://yourdomain.com", "http://localhost:3000"]
```

3. Click **"Save changes"**

---

## 🔧 Bước 6: Cấu hình IAM Policy (Hạn chế quyền - Recommended)

Thay vì dùng `AmazonS3FullAccess`, nên tạo policy chỉ cho phép upload vào folder `resume/`.

### 6.1. Tạo Inline Policy

1. Vào **IAM** → **Users** → Click vào user vừa tạo
2. Tab **"Permissions"** → **"Add permissions"** → **"Create inline policy"**
3. Click tab **"JSON"**

### 6.2. Dán Policy

Copy và dán policy sau (thay `your-bucket-name` bằng tên bucket thực tế):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::your-bucket-name/resume/*"
    }
  ]
}
```

**Giải thích**:
- `"Action": ["s3:PutObject"]`: Chỉ cho phép upload file
- `"Resource": "arn:aws:s3:::your-bucket-name/resume/*"`: Chỉ cho phép upload vào folder `resume/`

4. Click **"Next"** → Đặt tên policy (ví dụ: `S3UploadResume`) → **"Create policy"**

---

## 💻 Bước 7: Cấu hình Environment Variables trong Project

### 7.1. Tìm file `.env.local`

1. Mở project trong code editor
2. Tìm file `.env.local` ở root folder (cùng cấp với `package.json`)
3. Nếu chưa có, tạo file mới tên `.env.local`

### 7.2. Thêm AWS Credentials

Mở file `.env.local` và thêm các dòng sau (thay giá trị bằng thông tin thực tế của bạn):

```env
# AWS S3 Configuration (Required)
AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY_ID_HERE
AWS_SECRET_ACCESS_KEY=YOUR_SECRET_ACCESS_KEY_HERE
AWS_S3_BUCKET_NAME=your-bucket-name
AWS_REGION=ap-southeast-2

# Optional: Custom folder in S3 bucket (default: 'resume')
AWS_S3_FOLDER=resume

# Optional: Custom base URL (e.g., CloudFront distribution URL)
# If not set, will use default S3 URL: https://{bucket}.s3.{region}.amazonaws.com/{folder}/{file}
# AWS_S3_BASE_URL=https://your-cloudfront-url.com
```

**Giải thích từng biến**:
- `AWS_ACCESS_KEY_ID`: Access Key ID từ IAM User (Bước 2.4)
- `AWS_SECRET_ACCESS_KEY`: Secret Access Key từ IAM User (Bước 2.4)
- `AWS_S3_BUCKET_NAME`: Tên bucket vừa tạo (Bước 3.2)
- `AWS_REGION`: Region của bucket (Bước 3.2)
- `AWS_S3_FOLDER`: Folder trong bucket để lưu file (mặc định: `resume`)
- `AWS_S3_BASE_URL`: (Optional) URL CloudFront nếu dùng CDN

### 7.3. Kiểm tra `.gitignore`

Đảm bảo file `.env.local` đã có trong `.gitignore` để không commit credentials lên git:

```gitignore
# .env files
.env.local
.env
```

---

## 📤 Bước 8: Sử dụng API để Upload File

### 8.1. API Endpoint

**URL**: `POST /api/admin/upload/cv`

**Headers**:
```
Content-Type: multipart/form-data
```

**Body (FormData)**:
- `file`: File PDF cần upload

### 8.2. Ví dụ code JavaScript/React

#### Cách 1: Sử dụng Fetch API

```javascript
const uploadCV = async (file) => {
  // Tạo FormData
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('/api/admin/upload/cv', {
      method: 'POST',
      body: formData,
      // Không set Content-Type header, browser sẽ tự động set với boundary
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Upload failed');
    }

    const result = await response.json();
    console.log('Upload success:', result);
    // result.data chứa:
    // {
    //   path: "https://bucket.s3.region.amazonaws.com/resume/CV_1234567890_filename.pdf",
    //   fileName: "CV_1234567890_filename.pdf",
    //   originalFileName: "filename.pdf"
    // }
    
    return result.data;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

// Sử dụng
const handleFileSelect = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file type
  if (file.type !== 'application/pdf') {
    alert('Chỉ chấp nhận file PDF');
    return;
  }

  // Validate file size (10MB)
  if (file.size > 10 * 1024 * 1024) {
    alert('File size phải nhỏ hơn 10MB');
    return;
  }

  try {
    const result = await uploadCV(file);
    console.log('File uploaded:', result.path);
    // Lưu result.path vào database
  } catch (error) {
    alert('Upload failed: ' + error.message);
  }
};
```

#### Cách 2: Sử dụng Axios

```javascript
import axios from 'axios';

const uploadCV = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post('/api/admin/upload/cv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true, // Nếu cần gửi cookies
    });

    console.log('Upload success:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Upload error:', error.response?.data || error.message);
    throw error;
  }
};
```

#### Cách 3: Sử dụng trong React Component với React Hook Form

```javascript
import { useForm } from 'react-hook-form';
import axios from 'axios';

function CVUploadForm() {
  const { setValue, watch, setError } = useForm();
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate
    if (file.type !== 'application/pdf') {
      setError('cv', { message: 'Chỉ chấp nhận file PDF' });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('cv', { message: 'File size phải nhỏ hơn 10MB' });
      return;
    }

    try {
      setUploading(true);
      
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('/api/admin/upload/cv', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Lưu path vào form
      setValue('cvPath', response.data.data.path);
      console.log('Uploaded:', response.data.data.path);
    } catch (error) {
      setError('cv', { 
        message: error.response?.data?.message || 'Upload failed' 
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <p>Đang upload...</p>}
    </div>
  );
}
```

### 8.3. Response Format

**Success (200)**:
```json
{
  "status": 200,
  "message": "File uploaded successfully",
  "data": {
    "path": "https://my-bucket.s3.ap-southeast-2.amazonaws.com/resume/CV_1234567890_CV_LinHuaChung.pdf",
    "fileName": "CV_1234567890_CV_LinHuaChung.pdf",
    "originalFileName": "CV_LinHuaChung.pdf"
  }
}
```

**Error (400/500)**:
```json
{
  "status": 400,
  "message": "Only PDF files are allowed"
}
```

---

## 📥 Bước 9: Download File từ S3

### 9.1. Download trực tiếp từ S3 URL

Sau khi upload, bạn có URL của file (trong `result.data.path`). Có thể download trực tiếp:

```javascript
// Cách 1: Mở link trực tiếp
const cvUrl = "https://my-bucket.s3.region.amazonaws.com/resume/CV_1234567890_filename.pdf";
window.open(cvUrl, '_blank');

// Cách 2: Force download với blob
const downloadCV = async (cvUrl) => {
  try {
    const response = await fetch(cvUrl);
    const blob = await response.blob();
    
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'CV.pdf'; // Tên file khi download
    link.click();
    
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed:', error);
  }
};
```

### 9.2. Sử dụng API Proxy (Nếu cần)

Nếu muốn dùng API proxy để download (tránh CORS issues):

**API Endpoint**: `GET /api/user/download-cv`

```javascript
const downloadCV = async () => {
  try {
    const response = await fetch('/api/user/download-cv');
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Download failed');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    // Lấy filename từ header
    const contentDisposition = response.headers.get('content-disposition');
    const fileName = contentDisposition?.match(/filename="?(.+?)"?$/)?.[1] || 'CV.pdf';
    link.download = fileName;
    
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download failed:', error);
    alert(error.message);
  }
};
```

---

## 🧪 Bước 10: Test Upload và Download

### 10.1. Test Upload

1. Mở project và chạy dev server:
```bash
npm run dev
```

2. Mở admin panel (nơi có form upload CV)
3. Chọn file PDF (nhỏ hơn 10MB)
4. Click upload
5. Kiểm tra:
   - Console không có error
   - Nhận được response với `path` là S3 URL
   - File xuất hiện trong S3 bucket (folder `resume/`)

### 10.2. Test Download

1. Copy S3 URL từ response
2. Mở URL trong browser
3. File PDF phải hiển thị hoặc download được

### 10.3. Kiểm tra trong AWS Console

1. Vào S3 → Chọn bucket
2. Click vào folder `resume/`
3. Phải thấy file vừa upload

---

## ❌ Troubleshooting (Xử lý lỗi)

### Lỗi 1: "AWS S3 credentials are not configured"

**Nguyên nhân**: Thiếu hoặc sai environment variables

**Giải pháp**:
1. Kiểm tra file `.env.local` có đúng tên không
2. Kiểm tra các biến `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_S3_BUCKET_NAME` đã có chưa
3. Restart dev server sau khi thêm/sửa `.env.local`

### Lỗi 2: "Access Denied" khi upload

**Nguyên nhân**: IAM User không có quyền upload

**Giải pháp**:
1. Kiểm tra IAM User có policy `AmazonS3FullAccess` hoặc custom policy với `s3:PutObject`
2. Đảm bảo policy có `Resource` đúng bucket name và folder

### Lỗi 3: "Access Denied" khi download

**Nguyên nhân**: Bucket Policy chưa được cấu hình

**Giải pháp**:
1. Kiểm tra Bucket Policy đã có chưa (Bước 4)
2. Đảm bảo đã unblock public access (Bước 3.2)
3. Kiểm tra `Resource` trong policy có đúng folder `resume/*` không

### Lỗi 4: "CORS error" khi download từ browser

**Nguyên nhân**: CORS chưa được cấu hình

**Giải pháp**:
1. Kiểm tra CORS configuration (Bước 5)
2. Đảm bảo `AllowedOrigins` có domain của bạn (hoặc `*` cho development)
3. Đợi vài giây sau khi save CORS config

### Lỗi 5: "The bucket does not allow ACLs"

**Nguyên nhân**: Bucket được tạo với ACLs disabled

**Giải pháp**:
- Code đã được cập nhật để không dùng ACL. Nếu vẫn lỗi, kiểm tra:
  1. Bucket có "Block public access" đã uncheck chưa
  2. Bucket Policy đã được thêm chưa

### Lỗi 6: File upload thành công nhưng không thấy trong S3

**Nguyên nhân**: Upload vào bucket/region sai

**Giải pháp**:
1. Kiểm tra `AWS_S3_BUCKET_NAME` trong `.env.local` đúng chưa
2. Kiểm tra `AWS_REGION` đúng với region của bucket
3. Kiểm tra folder `resume/` trong bucket

---

## 📚 Tài liệu tham khảo

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS IAM Documentation](https://docs.aws.amazon.com/iam/)
- [S3 CORS Configuration](https://docs.aws.amazon.com/AmazonS3/latest/userguide/cors.html)
- [S3 Bucket Policies](https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-policies.html)

---

## 🔒 Security Best Practices

1. **Không commit credentials**: Đảm bảo `.env.local` trong `.gitignore`
2. **Sử dụng IAM roles** (nếu deploy lên AWS): Thay vì hardcode credentials
3. **Giới hạn quyền IAM user**: Chỉ cho phép upload vào folder cụ thể (Bước 6)
4. **Giới hạn CORS origins**: Trong production, thay `"*"` bằng domain cụ thể
5. **Sử dụng CloudFront**: Để có CDN và có thể thêm authentication nếu cần
6. **Enable S3 versioning**: Để có thể rollback nếu cần
7. **Setup lifecycle policies**: Để tự động xóa file cũ sau một thời gian

---

## 📝 Lưu ý quan trọng

- File được upload sẽ có tên format: `CV_{timestamp}_{sanitized_name}`
- Kích thước file tối đa: **10MB**
- Chỉ chấp nhận file **PDF**
- File được lưu trong folder `resume/` trong bucket
- URL format: `https://{bucket}.s3.{region}.amazonaws.com/{folder}/{file}`

## Cách hoạt động

1. **Nếu có cấu hình `AWS_S3_BUCKET_NAME`**: 
   - File sẽ được upload lên AWS S3 bucket
   - File sẽ được lưu với path: `{AWS_S3_FOLDER}/{CV_timestamp_filename.pdf}`
   - File được set ACL là `public-read` để có thể truy cập công khai
   - Trả về public URL của file

2. **Nếu không có cấu hình `AWS_S3_BUCKET_NAME`**:
   - File sẽ được lưu local trong thư mục `public/assets/resume/` (fallback)

## Cách lấy AWS Credentials

### 1. Tạo IAM User với quyền S3

1. Đăng nhập vào [AWS Console](https://console.aws.amazon.com/)
2. Vào **IAM** → **Users** → **Create user**
3. Chọn **Attach policies directly**
4. Tìm và chọn policy: **AmazonS3FullAccess** (hoặc tạo custom policy với quyền hạn chế hơn)
5. Tạo user và lưu **Access Key ID** và **Secret Access Key**

### 2. Tạo S3 Bucket

1. Vào **S3** → **Create bucket**
2. Đặt tên bucket (phải unique globally)
3. Chọn region (ví dụ: `us-east-1`)
4. **Uncheck** "Block all public access" nếu muốn file public (hoặc cấu hình bucket policy)
5. Tạo bucket

### 3. Cấu hình Bucket Policy (BẮT BUỘC - để file có thể download được)

**Bước 1: Unblock Public Access**

1. Vào **S3** → Chọn bucket `chun-portfolio-1304`
2. Tab **Permissions** → **Block public access (bucket settings)**
3. Click **Edit** → **Uncheck** tất cả các options:
   - ☐ Block all public access
   - ☐ Block public access to buckets and objects granted through new access control lists (ACLs)
   - ☐ Block public access to buckets and objects granted through any access control lists (ACLs)
   - ☐ Block public access to buckets and objects granted through new public bucket or access point policies
   - ☐ Block public and cross-account access to buckets and objects through any public bucket or access point policies
4. Click **Save changes** → Xác nhận bằng cách gõ `confirm`

**Bước 2: Thêm Bucket Policy**

1. Vẫn ở tab **Permissions** → Scroll xuống **Bucket policy**
2. Click **Edit** → **Policy editor**
3. Dán policy sau (thay `chun-portfolio-1304` bằng tên bucket của bạn nếu khác):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::chun-portfolio-1304/resume/*"
    }
  ]
}
```

4. Click **Save changes**

**Bước 3: Cấu hình CORS (BẮT BUỘC - để download từ browser)**

1. Vẫn ở tab **Permissions** → Scroll xuống **Cross-origin resource sharing (CORS)**
2. Click **Edit** → Dán cấu hình sau:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["Content-Length", "Content-Type", "Content-Disposition"],
    "MaxAgeSeconds": 3000
  }
]
```

3. Click **Save changes**

**Lưu ý quan trọng:**
- CORS configuration là **BẮT BUỘC** nếu bạn muốn download file từ browser (fetch từ frontend)
- `AllowedOrigins: ["*"]` cho phép tất cả domains. Để bảo mật hơn, thay bằng domain cụ thể:
  - Development: `["http://localhost:3000"]`
  - Production: `["https://yourdomain.com"]`
- Sau khi cấu hình CORS, cần đợi vài giây để AWS apply changes

**Lưu ý quan trọng:**
- Bucket Policy chỉ cho phép public read cho folder `resume/*` (an toàn hơn)
- Nếu muốn cho phép toàn bộ bucket, thay `arn:aws:s3:::chun-portfolio-1304/resume/*` bằng `arn:aws:s3:::chun-portfolio-1304/*`
- CORS configuration cho phép browser download file từ S3
- Sau khi cấu hình, file mới upload sẽ có thể download được ngay

### 4. (Optional) Setup CloudFront Distribution

Để có CDN và custom domain:

1. Vào **CloudFront** → **Create distribution**
2. Chọn S3 bucket làm origin
3. Cấu hình settings và tạo distribution
4. Lấy distribution URL và set vào `AWS_S3_BASE_URL`

## IAM Policy (Recommended - Limited Permissions)

Thay vì dùng `AmazonS3FullAccess`, nên tạo custom policy với quyền hạn chế:

### Cách thêm Policy cho IAM User:

1. Vào **AWS Console** → **IAM** → **Users** → Chọn user của bạn
2. Tab **Permissions** → **Add permissions** → **Create inline policy**
3. Chọn tab **JSON** và dán policy sau (thay `your-bucket-name` bằng tên bucket thực tế):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl"
      ],
      "Resource": "arn:aws:s3:::your-bucket-name/resume/*"
    }
  ]
}
```

4. Đặt tên policy (ví dụ: `S3UploadResume`) → **Create policy**

**Lưu ý**: 
- Thay `your-bucket-name` bằng tên bucket thực tế (ví dụ: `chun-portfolio-1304`)
- Policy này chỉ cho phép upload vào folder `resume/` trong bucket
- Nếu cần quyền rộng hơn, có thể dùng `AmazonS3FullAccess` policy có sẵn

## Lưu ý

- File được upload sẽ có tên được generate tự động với format: `CV_{timestamp}_{sanitized_name}`
- Kích thước file tối đa: 10MB
- Chỉ chấp nhận file PDF
- File được set ACL `public-read` để có thể truy cập công khai
- Nếu không muốn file public, cần thay đổi ACL trong code hoặc sử dụng presigned URLs

## Security Best Practices

1. **Không commit credentials vào git**: Đảm bảo `.env.local` trong `.gitignore`
2. **Sử dụng IAM roles** (nếu deploy lên AWS): Thay vì hardcode credentials
3. **Giới hạn quyền IAM user**: Chỉ cho phép upload vào folder cụ thể
4. **Sử dụng CloudFront**: Để có CDN và có thể thêm authentication nếu cần
5. **Enable S3 versioning**: Để có thể rollback nếu cần
6. **Setup lifecycle policies**: Để tự động xóa file cũ sau một thời gian
