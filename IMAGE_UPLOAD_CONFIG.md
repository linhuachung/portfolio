# Image Upload Configuration - AWS S3

## 📋 Tổng quan

Hệ thống hỗ trợ upload **Image** (avatar, photos) lên **AWS S3** (Amazon Simple Storage Service) thay vì lưu trong source code hoặc dùng base64. Điều này giúp:
- ✅ File không chiếm dung lượng trong code repository
- ✅ Dễ dàng quản lý và backup
- ✅ Có thể scale khi có nhiều file
- ✅ Có thể sử dụng CDN (CloudFront) để tăng tốc độ tải
- ✅ Tối ưu performance hơn base64 (không làm tăng kích thước HTML)

## 🎯 Mục tiêu

Sau khi hoàn thành hướng dẫn này, bạn sẽ:
1. Có tài khoản AWS và S3 bucket (có thể dùng chung với CV upload)
2. Cấu hình được credentials trong project
3. Upload và hiển thị image thành công
4. Hiểu cách sử dụng API để upload image

---

## 📝 Bước 1: Tạo tài khoản AWS (Nếu chưa có)

**Lưu ý**: Nếu bạn đã cấu hình AWS S3 cho CV upload rồi, có thể **bỏ qua bước này** và dùng chung bucket.

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

**Lưu ý**: Nếu bạn đã có IAM User cho CV upload, có thể **dùng chung** user đó (chỉ cần thêm quyền upload vào folder `images/`).

### 2.1. Tạo IAM User (Nếu chưa có)

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

## 🪣 Bước 3: Tạo S3 Bucket (Hoặc dùng bucket hiện có)

**Lưu ý**: Nếu bạn đã có bucket cho CV upload, có thể **dùng chung bucket** và tạo folder `images/` riêng.

### 3.1. Tạo Bucket (Nếu chưa có)

1. Trong AWS Console, tìm và click **"S3"** (hoặc search "S3")
2. Click nút **"Create bucket"** (màu cam ở góc trên bên phải)

### 3.2. Cấu hình Bucket

1. **Tab "General configuration"**:
   - **Bucket name**: Nhập tên bucket (phải unique toàn cầu, ví dụ: `my-portfolio-2024`)
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

### 3.3. Tạo folder `images/` trong bucket

1. Click vào tên bucket vừa tạo
2. Click nút **"Create folder"**
3. Đặt tên folder: `images`
4. Click **"Create folder"**

---

## 🔐 Bước 4: Cấu hình Bucket Policy (Cho phép xem image)

**Lưu ý**: Nếu bucket đã có Bucket Policy cho CV, chỉ cần thêm resource cho folder `images/*`.

### 4.1. Thêm/Update Bucket Policy

1. Trong S3, click vào tên bucket
2. Click tab **"Permissions"**
3. Scroll xuống phần **"Bucket policy"**
4. Click **"Edit"** → **"Policy editor"**

### 4.2. Dán Policy

**Nếu bucket chưa có policy**, copy và dán policy sau (thay `your-bucket-name` bằng tên bucket của bạn):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": [
        "arn:aws:s3:::your-bucket-name/images/*",
        "arn:aws:s3:::your-bucket-name/resume/*"
      ]
    }
  ]
}
```

**Nếu bucket đã có policy**, thêm resource `images/*` vào mảng `Resource`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": [
        "arn:aws:s3:::your-bucket-name/resume/*",
        "arn:aws:s3:::your-bucket-name/images/*"
      ]
    }
  ]
}
```

**Giải thích**:
- `"Principal": "*"`: Cho phép tất cả mọi người
- `"Action": "s3:GetObject"`: Cho phép đọc (xem) file
- `"Resource"`: Cho phép cả folder `resume/` và `images/`

5. Click **"Save changes"**

---

## 🌐 Bước 5: Cấu hình CORS (Cho phép hiển thị image từ browser)

**Lưu ý**: Nếu bucket đã có CORS config, có thể bỏ qua bước này.

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

**Lưu ý**: Nếu IAM User đã có policy, chỉ cần thêm resource `images/*`.

### 6.1. Tạo/Update Inline Policy

1. Vào **IAM** → **Users** → Click vào user của bạn
2. Tab **"Permissions"** → **"Add permissions"** → **"Create inline policy"** (hoặc edit policy hiện có)
3. Click tab **"JSON"**

### 6.2. Dán Policy

**Nếu chưa có policy**, copy và dán policy sau (thay `your-bucket-name` bằng tên bucket thực tế):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject"
      ],
      "Resource": [
        "arn:aws:s3:::your-bucket-name/resume/*",
        "arn:aws:s3:::your-bucket-name/images/*"
      ]
    }
  ]
}
```

**Nếu đã có policy**, thêm resource `images/*` vào mảng `Resource`.

4. Click **"Next"** → Đặt tên policy (ví dụ: `S3UploadFiles`) → **"Create policy"**

---

## 💻 Bước 7: Cấu hình Environment Variables trong Project

### 7.1. Tìm file `.env.local`

1. Mở project trong code editor
2. Tìm file `.env.local` ở root folder (cùng cấp với `package.json`)
3. Nếu chưa có, tạo file mới tên `.env.local`

### 7.2. Thêm AWS Credentials (Nếu chưa có)

Mở file `.env.local` và thêm các dòng sau (thay giá trị bằng thông tin thực tế của bạn):

```env
# AWS S3 Configuration (Required)
AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY_ID_HERE
AWS_SECRET_ACCESS_KEY=YOUR_SECRET_ACCESS_KEY_HERE
AWS_S3_BUCKET_NAME=your-bucket-name
AWS_REGION=ap-southeast-2

# Optional: Custom folder in S3 bucket for CV (default: 'resume')
AWS_S3_FOLDER=resume

# Optional: Custom folder in S3 bucket for Images (default: 'images')
AWS_S3_IMAGES_FOLDER=images

# Optional: Custom base URL (e.g., CloudFront distribution URL)
# If not set, will use default S3 URL: https://{bucket}.s3.{region}.amazonaws.com/{folder}/{file}
# AWS_S3_BASE_URL=https://your-cloudfront-url.com
```

**Giải thích từng biến**:
- `AWS_ACCESS_KEY_ID`: Access Key ID từ IAM User (Bước 2.4)
- `AWS_SECRET_ACCESS_KEY`: Secret Access Key từ IAM User (Bước 2.4)
- `AWS_S3_BUCKET_NAME`: Tên bucket (Bước 3.2)
- `AWS_REGION`: Region của bucket (Bước 3.2)
- `AWS_S3_FOLDER`: Folder trong bucket để lưu CV (mặc định: `resume`)
- `AWS_S3_IMAGES_FOLDER`: Folder trong bucket để lưu images (mặc định: `images`)
- `AWS_S3_BASE_URL`: (Optional) URL CloudFront nếu dùng CDN

### 7.3. Kiểm tra `.gitignore`

Đảm bảo file `.env.local` đã có trong `.gitignore` để không commit credentials lên git:

```gitignore
# .env files
.env.local
.env
```

---

## 📤 Bước 8: Sử dụng API để Upload Image

### 8.1. API Endpoint

**URL**: `POST /api/admin/upload/image`

**Headers**:
```
Content-Type: multipart/form-data
Authorization: Bearer <token> (Required - Admin authentication)
```

**Body (FormData)**:
- `file`: File image cần upload (PNG, JPEG, JPG) (Required)
- `type`: (Optional) Loại image - `avatar`, `photo`, etc. (Không ảnh hưởng đến upload, chỉ để reference)

**Lưu ý**: API sử dụng shared upload handler với validation tự động:
- ✅ Validate file type (chỉ PNG, JPEG, JPG)
- ✅ Validate file size (max 5MB)
- ✅ Validate filename (không chứa ký tự nguy hiểm)
- ✅ Validate buffer (không rỗng, không corrupted)
- ✅ Auto-generate unique filename với prefix `IMG_`
- ✅ Auto-detect content-type từ file

### 8.2. Response Format

**Success Response (200)**:
```json
{
  "status": 200,
  "message": "Image uploaded successfully",
  "data": {
    "path": "https://bucket.s3.region.amazonaws.com/images/IMG_1234567890_avatar.jpg",
    "fileName": "IMG_1234567890_avatar.jpg",
    "originalFileName": "avatar.jpg"
  }
}
```

**Error Response (400/500)**:
```json
{
  "status": 400,
  "message": "Error message here",
  "data": null
}
```

### 8.3. Ví dụ code JavaScript/React

#### Cách 1: Sử dụng Fetch API

```javascript
const uploadImage = async (file) => {
  // Tạo FormData
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', 'avatar'); // Optional: avatar, photo, etc.

  try {
    const response = await fetch('/api/admin/upload/image', {
      method: 'POST',
      body: formData,
      // Không set Content-Type header, browser sẽ tự động set với boundary
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Upload failed');
    }

    const result = await response.json();
    
    if (result.status !== 200 || !result.data) {
      throw new Error(result.message || 'Upload failed');
    }
    
    console.log('Upload success:', result);
    // result.data chứa:
    // {
    //   path: "https://bucket.s3.region.amazonaws.com/images/IMG_1234567890_avatar.jpg",
    //   fileName: "IMG_1234567890_avatar.jpg",
    //   originalFileName: "avatar.jpg"
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
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  if (!allowedTypes.includes(file.type)) {
    alert('Chỉ chấp nhận file PNG, JPEG, JPG');
    return;
  }

  // Validate file size (5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert('File size phải nhỏ hơn 5MB');
    return;
  }

  try {
    const result = await uploadImage(file);
    console.log('Image uploaded:', result.path);
    // Lưu result.path vào database hoặc state
    setAvatarUrl(result.path);
  } catch (error) {
    alert('Upload failed: ' + error.message);
  }
};
```

#### Cách 2: Sử dụng Axios

```javascript
import axios from 'axios';

const uploadImage = async (file, type = 'avatar') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);

  try {
    const response = await axios.post('/api/admin/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true, // Nếu cần gửi cookies
    });

    if (response.data.status !== 200 || !response.data.data) {
      throw new Error(response.data.message || 'Upload failed');
    }
    
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

function AvatarUploadForm() {
  const { setValue, watch, setError } = useForm();
  const [uploading, setUploading] = useState(false);
  const avatarUrl = watch('avatar');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      setError('avatar', { message: 'Chỉ chấp nhận file PNG, JPEG, JPG' });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('avatar', { message: 'File size phải nhỏ hơn 5MB' });
      return;
    }

    try {
      setUploading(true);
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'avatar');

      const response = await axios.post('/api/admin/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Lưu path vào form
      setValue('avatar', response.data.data.path);
      console.log('Uploaded:', response.data.data.path);
    } catch (error) {
      setError('avatar', { 
        message: error.response?.data?.message || 'Upload failed' 
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {avatarUrl && (
        <img src={avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full" />
      )}
      <input
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <p>Đang upload...</p>}
    </div>
  );
}
```

#### Cách 4: Sử dụng với Next.js Image Component

```javascript
import Image from 'next/image';

function AvatarDisplay({ avatarUrl }) {
  return (
    <Image
      src={avatarUrl || '/assets/avatarDefault.png'}
      alt="Avatar"
      width={120}
      height={120}
      className="rounded-full object-cover"
      // Next.js Image component tự động optimize image
    />
  );
}
```

### 8.3. Response Format

**Success (200)**:
```json
{
  "status": 200,
  "message": "Image uploaded successfully",
  "data": {
    "path": "https://my-bucket.s3.ap-southeast-2.amazonaws.com/images/IMG_1234567890_avatar.jpg",
    "fileName": "IMG_1234567890_avatar.jpg",
    "originalFileName": "avatar.jpg"
  }
}
```

**Error (400/500)**:
```json
{
  "status": 400,
  "message": "Only PNG, JPEG, JPG images are allowed"
}
```

---

## 🖼️ Bước 9: Hiển thị Image từ S3

### 9.1. Hiển thị trực tiếp từ S3 URL

Sau khi upload, bạn có URL của image (trong `result.data.path`). Có thể hiển thị trực tiếp:

```javascript
// Cách 1: Dùng thẻ img HTML
<img 
  src="https://my-bucket.s3.region.amazonaws.com/images/IMG_1234567890_avatar.jpg" 
  alt="Avatar"
  className="rounded-full"
/>

// Cách 2: Dùng Next.js Image component (Recommended)
import Image from 'next/image';

<Image
  src={avatarUrl || '/assets/avatarDefault.png'}
  alt="Avatar"
  width={120}
  height={120}
  className="rounded-full object-cover"
/>
```

### 9.2. Next.js Image Configuration (Đã tự động config)

Hệ thống đã được cấu hình tự động trong `next.config.mjs` để support:
- ✅ S3 URLs (`*.s3.*.amazonaws.com`, `*.s3.amazonaws.com`)
- ✅ CloudFront URLs (tự động nếu có `AWS_S3_BASE_URL`)

**Không cần config thêm** nếu dùng default S3 URLs. Nếu muốn xem config, check file `next.config.mjs`:

```javascript
// next.config.mjs (đã được config tự động)
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.s3.*.amazonaws.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: '*.s3.amazonaws.com',
        pathname: '/**'
      },
      // Auto-support CloudFront nếu có AWS_S3_BASE_URL
      ...(process.env.AWS_S3_BASE_URL ? [{
        protocol: 'https',
        hostname: new URL(process.env.AWS_S3_BASE_URL).hostname,
        pathname: '/**'
      }] : [])
    ]
  }
};
```

**Lưu ý**: 
- ✅ Config đã tự động support S3 và CloudFront
- ✅ Không cần thêm config thủ công
- ✅ Restart dev server sau khi thay đổi `AWS_S3_BASE_URL`

### 9.3. Fallback image

Luôn có fallback image khi S3 URL không load được:

```javascript
const [imageError, setImageError] = useState(false);

<img
  src={imageError ? '/assets/avatarDefault.png' : avatarUrl}
  alt="Avatar"
  onError={() => setImageError(true)}
  className="rounded-full"
/>
```

---

## 🧪 Bước 10: Test Upload và Hiển thị

### 10.1. Test Upload

1. Mở project và chạy dev server:
```bash
npm run dev
```

2. Mở admin panel (nơi có form upload avatar/image)
3. Chọn file image (PNG, JPEG, JPG, nhỏ hơn 5MB)
4. Click upload
5. Kiểm tra:
   - Console không có error
   - Nhận được response với `path` là S3 URL
   - File xuất hiện trong S3 bucket (folder `images/`)

### 10.2. Test Hiển thị

1. Copy S3 URL từ response
2. Mở URL trong browser
3. Image phải hiển thị được

### 10.3. Kiểm tra trong AWS Console

1. Vào S3 → Chọn bucket
2. Click vào folder `images/`
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
1. Kiểm tra IAM User có policy với `s3:PutObject` không
2. Đảm bảo policy có `Resource` đúng bucket name và folder `images/*`

### Lỗi 3: "Access Denied" khi xem image

**Nguyên nhân**: Bucket Policy chưa được cấu hình

**Giải pháp**:
1. Kiểm tra Bucket Policy đã có resource `images/*` chưa (Bước 4)
2. Đảm bảo đã unblock public access (Bước 3.2)
3. Kiểm tra `Resource` trong policy có đúng folder `images/*` không

### Lỗi 4: "CORS error" khi hiển thị image từ browser

**Nguyên nhân**: CORS chưa được cấu hình

**Giải pháp**:
1. Kiểm tra CORS configuration (Bước 5)
2. Đảm bảo `AllowedOrigins` có domain của bạn (hoặc `*` cho development)
3. Đợi vài giây sau khi save CORS config

### Lỗi 5: Next.js Image component không hiển thị external image

**Nguyên nhân**: 
- URL không match với remotePatterns đã config
- Chưa restart dev server sau khi thay đổi config

**Giải pháp**:
1. Kiểm tra URL có đúng format S3 không: `https://bucket.s3.region.amazonaws.com/...`
2. Nếu dùng CloudFront, đảm bảo `AWS_S3_BASE_URL` đã được set đúng
3. Restart dev server: `npm run dev`
4. Kiểm tra `next.config.mjs` có config đúng không

### Lỗi 6: Image upload thành công nhưng không thấy trong S3

**Nguyên nhân**: Upload vào bucket/folder sai

**Giải pháp**:
1. Kiểm tra `AWS_S3_BUCKET_NAME` trong `.env.local` đúng chưa
2. Kiểm tra `AWS_S3_IMAGES_FOLDER` đúng chưa (mặc định: `images`)
3. Kiểm tra folder `images/` trong bucket

### Lỗi 7: Image quá lớn, upload chậm

**Nguyên nhân**: File size quá lớn

**Giải pháp**:
1. Compress image trước khi upload (dùng tools như TinyPNG, ImageOptim)
2. Resize image về kích thước phù hợp (ví dụ: 500x500px cho avatar)
3. Cân nhắc tăng limit file size trong code (nếu cần)

---

## 🔧 Technical Details

### Upload Handler Architecture

**File**: `lib/upload-handler.js`

**Functions**:
- `handleFileUpload(req, uploadType)`: Main handler function
- `validateFileForUpload(file, uploadType)`: File validation
- `validateBuffer(buffer)`: Buffer validation

**Upload Types**:
- `UPLOAD_TYPES.CV`: Configuration cho CV upload
- `UPLOAD_TYPES.IMAGE`: Configuration cho Image upload

**Validation Features**:
- ✅ File type validation
- ✅ File size validation
- ✅ Filename dangerous characters check
- ✅ Buffer validation (not empty, not corrupted)
- ✅ Content-type validation (auto-detect từ file)

### Error Handling

Tất cả errors được handle centrally trong upload handler:
- **400 Bad Request**: Validation errors (file type, size, filename)
- **500 Internal Server Error**: S3 upload errors, configuration errors

### Response Format

Tất cả responses follow format:
```json
{
  "status": 200 | 400 | 500,
  "message": "Success or error message",
  "data": { ... } | null
}
```

### Next.js Image Optimization

Hệ thống tự động config Next.js Image component để support:
- ✅ S3 URLs (`*.s3.*.amazonaws.com`)
- ✅ CloudFront URLs (nếu có `AWS_S3_BASE_URL`)
- ✅ Automatic image optimization
- ✅ Lazy loading

---

## 📚 Tài liệu tham khảo

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS IAM Documentation](https://docs.aws.amazon.com/iam/)
- [S3 CORS Configuration](https://docs.aws.amazon.com/AmazonS3/latest/userguide/cors.html)
- [S3 Bucket Policies](https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-policies.html)
- [Next.js Image Optimization](https://nextjs.org/docs/pages/api-reference/components/image)

---

## 🔒 Security Best Practices

1. **Không commit credentials**: Đảm bảo `.env.local` trong `.gitignore`
2. **Sử dụng IAM roles** (nếu deploy lên AWS): Thay vì hardcode credentials
3. **Giới hạn quyền IAM user**: Chỉ cho phép upload vào folder cụ thể (Bước 6)
4. **Giới hạn CORS origins**: Trong production, thay `"*"` bằng domain cụ thể
5. **Sử dụng CloudFront**: Để có CDN và có thể thêm authentication nếu cần
6. **Enable S3 versioning**: Để có thể rollback nếu cần
7. **Setup lifecycle policies**: Để tự động xóa file cũ sau một thời gian
8. **Validate file type và size**: Luôn validate ở cả client và server
9. **Sanitize filename**: Tránh filename có ký tự đặc biệt nguy hiểm

---

## 📝 Lưu ý quan trọng

- Image được upload sẽ có tên format: `IMG_{timestamp}_{sanitized_name}`
- Kích thước file tối đa: **5MB** (có thể thay đổi trong code)
- Chỉ chấp nhận file **PNG, JPEG, JPG**
- Image được lưu trong folder `images/` trong bucket
- URL format: `https://{bucket}.s3.{region}.amazonaws.com/{folder}/{file}`
- Nên compress và resize image trước khi upload để tối ưu performance
- Next.js Image component tự động optimize image khi hiển thị

---

## 🎨 Image Optimization Tips

### 1. Compress Image trước khi upload

```javascript
// Sử dụng browser-image-compression library
import imageCompression from 'browser-image-compression';

const compressImage = async (file) => {
  const options = {
    maxSizeMB: 1, // Maximum size in MB
    maxWidthOrHeight: 1920, // Maximum width or height
    useWebWorker: true
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error('Compression error:', error);
    return file; // Return original if compression fails
  }
};

// Sử dụng
const handleFileSelect = async (event) => {
  const file = event.target.files[0];
  const compressedFile = await compressImage(file);
  await uploadImage(compressedFile);
};
```

### 2. Resize Image cho Avatar

```javascript
// Resize image to square (1:1 ratio) for avatar
const resizeImageForAvatar = (file, size = 500) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        // Draw image centered and cropped to square
        const minDimension = Math.min(img.width, img.height);
        const x = (img.width - minDimension) / 2;
        const y = (img.height - minDimension) / 2;
        
        ctx.drawImage(img, x, y, minDimension, minDimension, 0, 0, size, size);
        
        canvas.toBlob((blob) => {
          resolve(new File([blob], file.name, { type: 'image/jpeg' }));
        }, 'image/jpeg', 0.9);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};
```

### 3. Preview Image trước khi upload

```javascript
const [preview, setPreview] = useState(null);

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }
};

// Hiển thị preview
{preview && (
  <img src={preview} alt="Preview" className="w-32 h-32 rounded-full" />
)}
```

