# Laptop API Documentation

## Overview
API endpoints để quản lý laptops trong hệ thống. Bao gồm CRUD operations và hỗ trợ update image của laptop.

---

## Base URL
```
http://localhost:4000/api/laptops
```

---

## Authentication
Hầu hết các endpoints yêu cầu JWT token trong header:
```
Authorization: Bearer <your-jwt-token>
```

Để tạo/update laptop, bạn cần quyền **ADMIN**.

---

## Endpoints

### 1. Get All Laptops (Paginated)
Lấy danh sách tất cả laptops với phân trang và tìm kiếm.

**Endpoint:** `GET /laptops`

**Auth Required:** Bearer Token

**Query Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | number | No | 1 | Số trang |
| `limit` | number | No | 10 | Số lượng items per page |
| `searchQuery` | string | No | - | Tìm kiếm theo tên laptop |

**Example Request:**
```bash
curl -X GET "http://localhost:4000/api/laptops?page=1&limit=10&searchQuery=Dell" \
  -H "Authorization: Bearer <your-token>"
```

**Example Response:**
```json
{
  "items": [
    {
      "id": 1,
      "name": "Laptop Dell Vostro 3480",
      "price": 13690000,
      "brand": "Dell",
      "image": "https://example.com/dell-vostro.jpg"
    }
  ],
  "meta": {
    "totalItems": 100,
    "itemCount": 10,
    "itemsPerPage": 10,
    "totalPages": 10,
    "currentPage": 1
  }
}
```

---

### 2. Get Laptop By ID
Lấy chi tiết một laptop theo ID.

**Endpoint:** `GET /laptops/:id`

**Auth Required:** Bearer Token

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | number | Yes | ID của laptop |

**Example Request:**
```bash
curl -X GET "http://localhost:4000/api/laptops/1" \
  -H "Authorization: Bearer <your-token>"
```

**Example Response:**
```json
{
  "id": 1,
  "name": "Laptop Dell Vostro 3480-70183779/70187708",
  "cpu": "Core i5 8265U 1.6 Ghz up to 3.9Ghz-6Mb",
  "ram": "8Gb",
  "screen": "14.0Inch",
  "color": "Black",
  "os": "Windows 10 Home",
  "storage": "1Tb/ DVDRW",
  "graphicCard": "Intel Graphics HD 620",
  "description": "Laptop Dell Vostro 3480...",
  "pin": "4 cell",
  "price": 13690000,
  "material": "Plastic",
  "brand": "Dell",
  "quantity": 10,
  "image": "https://example.com/laptop-image.jpg"
}
```

---

### 3. Create New Laptop
Tạo một laptop mới (chỉ ADMIN).

**Endpoint:** `POST /laptops`

**Auth Required:** Bearer Token + ADMIN Role

**Request Body:**
```json
{
  "name": "Laptop Dell Vostro 3480-70183779/70187708",
  "cpu": "Core i5 8265U 1.6 Ghz up to 3.9Ghz-6Mb",
  "ram": "8Gb",
  "screen": "14.0Inch",
  "color": "Black",
  "os": "Windows 10 Home",
  "storage": "1Tb/ DVDRW",
  "graphicCard": "Intel Graphics HD 620",
  "description": "Laptop Dell Vostro 3480 mang đến hiệu năng mạnh mẽ...",
  "pin": "4 cell",
  "price": 13690000,
  "sale": 10,
  "quantity": 10,
  "material": "Plastic",
  "brand": "Dell",
  "image": "https://example.com/laptop-image.jpg"
}
```

**All Fields Required:**
- `name` (string): Tên laptop
- `cpu` (string): Thông tin CPU
- `ram` (string): Dung lượng RAM
- `screen` (string): Kích thước màn hình
- `color` (string): Màu sắc
- `os` (string): Hệ điều hành
- `storage` (string): Ổ cứng
- `graphicCard` (string): Card đồ họa
- `description` (string): Mô tả chi tiết
- `pin` (string): Thông tin pin
- `price` (number): Giá bán
- `sale` (number): % giảm giá
- `quantity` (number): Số lượng tồn kho
- `material` (string): Chất liệu
- `brand` (string): Thương hiệu
- `image` (string): URL hình ảnh

**Example Request:**
```bash
curl -X POST "http://localhost:4000/api/laptops" \
  -H "Authorization: Bearer <admin-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop Dell Vostro 3480",
    "cpu": "Core i5 8265U",
    "ram": "8Gb",
    "screen": "14.0Inch",
    "color": "Black",
    "os": "Windows 10 Home",
    "storage": "1Tb",
    "graphicCard": "Intel HD 620",
    "description": "Powerful laptop",
    "pin": "4 cell",
    "price": 13690000,
    "sale": 10,
    "quantity": 10,
    "material": "Plastic",
    "brand": "Dell",
    "image": "https://example.com/dell.jpg"
  }'
```

**Response:** `201 CREATED`
```json
{
  "id": 30,
  "name": "Laptop Dell Vostro 3480",
  ...all fields...
}
```

---

### 4. Update Laptop (Including Image) ⭐
Cập nhật thông tin laptop, **bao gồm cả image** (chỉ ADMIN).

**Endpoint:** `PATCH /laptops/:id`

**Auth Required:** Bearer Token + ADMIN Role

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | number | Yes | ID của laptop cần update |

**Request Body (All fields OPTIONAL):**
```json
{
  "name": "Updated Laptop Name",
  "cpu": "Core i7 10th Gen",
  "ram": "16Gb",
  "screen": "15.6Inch",
  "color": "Silver",
  "os": "Windows 11 Pro",
  "storage": "512GB SSD",
  "graphicCard": "NVIDIA GTX 1650",
  "description": "Updated description",
  "pin": "6 cell",
  "price": 20000000,
  "sale": 15,
  "quantity": 5,
  "material": "Aluminum",
  "brand": "Dell",
  "image": "https://new-image-url.com/laptop.jpg"
}
```

**Note:** Bạn chỉ cần gửi các field muốn update, không cần gửi tất cả.

**Example: Update Only Image**
```bash
curl -X PATCH "http://localhost:4000/api/laptops/1" \
  -H "Authorization: Bearer <admin-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "image": "https://new-image-url.com/new-laptop-image.jpg"
  }'
```

**Example: Update Multiple Fields Including Image**
```bash
curl -X PATCH "http://localhost:4000/api/laptops/1" \
  -H "Authorization: Bearer <admin-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 15000000,
    "sale": 20,
    "quantity": 8,
    "image": "https://example.com/updated-image.jpg"
  }'
```

**Response:** `201 CREATED`
```json
{
  "id": 1,
  "name": "Laptop Dell Vostro 3480",
  "image": "https://new-image-url.com/new-laptop-image.jpg",
  ...other fields...
}
```

---

## Error Responses

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 403 Forbidden (Not Admin)
```json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Laptop not found"
}
```

### 400 Bad Request (Validation Error)
```json
{
  "statusCode": 400,
  "message": [
    "name should not be empty",
    "price must be a number"
  ],
  "error": "Bad Request"
}
```

---

## Testing with Postman

### 1. Get Admin Token
First, login as admin to get JWT token:

```bash
POST http://localhost:4000/api/auth/login
Content-Type: application/json

{
  "email": "nguyenkien123ns@gmail.com",
  "password": "Kien123ns@"
}
```

Copy the `accessToken` from response.

### 2. Update Laptop Image
```bash
PATCH http://localhost:4000/api/laptops/1
Authorization: Bearer <your-access-token>
Content-Type: application/json

{
  "image": "https://example.com/new-laptop-image.jpg"
}
```

---

## Example: Complete Workflow

### Step 1: Login
```bash
curl -X POST "http://localhost:4000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nguyenkien123ns@gmail.com",
    "password": "Kien123ns@"
  }'
```

### Step 2: Get Laptop List
```bash
curl -X GET "http://localhost:4000/api/laptops?page=1&limit=10" \
  -H "Authorization: Bearer <token-from-step-1>"
```

### Step 3: Get Laptop Detail
```bash
curl -X GET "http://localhost:4000/api/laptops/1" \
  -H "Authorization: Bearer <token-from-step-1>"
```

### Step 4: Update Laptop Image
```bash
curl -X PATCH "http://localhost:4000/api/laptops/1" \
  -H "Authorization: Bearer <token-from-step-1>" \
  -H "Content-Type: application/json" \
  -d '{
    "image": "https://cloudinary.com/your-new-image.jpg"
  }'
```

---

## Notes

1. **Image Field**:
   - Type: `string` (URL)
   - Max length: 255 characters
   - Required when creating laptop
   - Optional when updating laptop

2. **Authentication**:
   - GET endpoints: Require any valid user token
   - POST/PATCH endpoints: Require ADMIN role

3. **Partial Update**:
   - PATCH endpoint hỗ trợ partial update
   - Chỉ cần gửi các field muốn thay đổi
   - Các field không gửi sẽ giữ nguyên giá trị cũ

4. **Image Storage**:
   - API này chỉ lưu URL của image
   - Bạn cần upload image lên storage service riêng (Cloudinary, AWS S3, etc.)
   - Sau đó lấy URL và update vào database

---

## Swagger Documentation

Khi chạy server, bạn có thể truy cập Swagger UI tại:
```
http://localhost:4000/api-docs
```

Swagger sẽ cung cấp interactive documentation để test API trực tiếp.

---

## Summary of Changes Made

✅ **Added `image` field to `CreateLaptopDto`**
- File: `libs/queries/src/dtos/laptop.dto.ts:136-142`
- Now required when creating new laptop

✅ **Added `image` field to `UpdateLaptopDto`**
- File: `libs/queries/src/dtos/laptop.dto.ts:259-265`
- Now optional when updating laptop

✅ **Updated `updateLaptop` repository method**
- File: `libs/queries/src/repositories/laptop.repository.ts:92`
- Now includes `image` in the update SET clause

✅ **API Ready to Use**
- Endpoint: `PATCH /laptops/:id`
- Can now update laptop images
- All changes backward compatible
