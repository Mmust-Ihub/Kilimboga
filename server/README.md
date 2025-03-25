<div align="center">

# Kilimboga Backend

<p> The backend engine for Kilimboga project </p>

**Things to take note of:**

#### base_url: https://kilimboga.vercel.app/

</div>

## Table Of Contents

1. [Authentication](#authentication)
2. [Farmer](#farmer)
3. [Admin](#admin)
4. [Expert](#expert)
5. [Vendor](#vendor)

# Authentication

> ## Register
>
> > **request**

- **_url_**: `{{base_url}}/api/v1/auth/register`
- **_method:_** `POST`
- **_`request body`:_ (form data)**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@gmail.com",
  "password": "password",
  "phoneNumber": "0712345678",
  "longitude": "34.123",
  "latitude": "0.1234",
  "isSpecial": false
  "documents" "[a file]"
}
```

> > **response**

- **_status code_**: `200`
- **_response body_**:

- ```json
    "status": "success",
      "message": "user created successfully"
  ```

> ## Verify Account
>
> > **request**

- **_url_**: `{{base_url}}/api/v1/auth/verify`
- **_method:_** `POST`
- **_request_body_**
- ```json
   "authCode": "HG123D"
  ```

> > **response**

- ```json
    "success": "Account verified successfully."
  ```

> ## Login
>
> > **request**

- **_url_**: `{{base_url}}/api/v1/auth/login`
- **_method:_** `POST`
- **_request_body_**
- ```json
   "email": "johndoe@gmail.com",
   "password": "password"
  ```

> > **response**

- **_status code_**: `200`
- **_response body_**:

- ```json
  {
    "status": "success",
    "token": "eyJ...",
    "user": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "johndoe@gmail.com",
      "role": "farmer"
    }
  }
  ```

# Vendor

> ## Statistics
>
> > **request**

- **_url_**: `{{base_url}}/api/v1/vendor/stats`
- **_method:_** `GET`
- **_headers:_**
  - Authorization: Bearer **token**

> > **response**

- ```json
  {
    "totalRevenue": 62,
    "pendingOrders": 4,
    "deliveredOrders": 6,
    "bestSellingProducts": [],
    "monthlyOrders": [],
    "monthlyRevenue": [],
    "currentMonthOrders": 10,
    "previousMonthOrders": 0,
    "percentageChange": "0.00"
  }
  ```

> ## Get Profile
>
> > **request**

- **_url_**: `{{base_url}}/api/v1/vendor/profile`
- **_method:_** `GET`
- **_headers:_**
  - Authorization: Bearer **token**

> > **response**

- ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "johndoe@gmail.com",
    "phoneNumber": "0712345678",
    "imageUrl": null "(profile image)"
  }
  ```

> ## Add Product
>
> > **request**

- **_url_**: `{{base_url}}/api/v1/vendor/product`
- **_method:_** `POST`
- **_headers:_**
  - Authorization: Bearer **token**
- **_request body:_** _(form data)_
- ```json
   "title": "tomatoes",
   "description": "A description about the product",
   "category": "any of these strings('fertilizers', 'seeds', 'tools', 'pesticides')",
   "quantity": 5,
   "price": 1,
   "image": "The input image"
  ```

> > **response**

- **_status_code:_** `201`
- **_response_body:_**

- ```json
  {
    "status": "success",
    "message": "product created successfully"
  }
  ```

> ## Get Products
>
> > **request**

- **_url_**: `{{base_url}}/api/v1/vendor/products`
- **_method:_** `GET`
- **_headers:_**
  - Authorization: Bearer **token**

> > **response**

- **_status_code:_** `200`
- **_response_body:_**

- ```json
  [{ "Returns array of all products owned by the  vendor" }]
  ```

> ## Edit Product
>
> > **request**

- **_url_**: `{{base_url}}/api/v1/vendor/product`
- **_method:_** `PATCH`
- **_headers:_**
  - Authorization: Bearer **token**
- **_request body:_** _(form data)_
- ```json
   "keys": "values of the edited product",
  ```

> > **response**

- **_status_code:_** `201`
- **_response_body:_**

- ```json
  { "A json request of the updated product" }
  ```

> ## Delete Product
>
> > **request**

- **_url_**: `{{base_url}}/api/v1/vendor/product`
- **_method:_** `DELETE`
- **_headers:_**

  - Authorization: Bearer **token**

- **_Required query parameters:_**

  | Parameter |  Type  |
  | :-------: | :----: |
  |    id     | string |

- **_example url_** :

```yaml
url: {{base_url}}/api/v1/vendor/product?id="product_id"
```

> > **response**
- **_status_code:_** `204`

> ## Orders
>
> > **request**

- **_url_**: `{{base_url}}/api/v1/vendor/orders`
- **_method:_** `GET`
- **_headers:_**

  - Authorization: Bearer **token**

- **_Required query parameters:_**

  | Parameter |  Type  | options |
  | :-------: | :----: | :-------:
  |   state   | string | *pending*, *delivered*

- **_example url_** :

```yaml
url: {{base_url}}/api/v1/vendor/orders?state="pending"
```

> > **response**
- **_status_code:_** `200`
- **_response_body:_**
- ```json
   [
    {}
   ]
  ```
