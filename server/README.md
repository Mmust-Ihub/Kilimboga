<div align="center">

# Kilimboga Backend

<p> The backend engine for Kilimboga project </p>

**Things to take note of:**

#### base_url: https://

</div>

## Table Of Contents

1. [Authentication](#authentication)
2. [Farmer](#farmer)
3. [Admin](#admin)
4. [Expert](#expert)
5. [Agrovet](#agrovet)

# authentication

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
  "password": "password" # not less than 6,
  "phoneNumber": "0712345678" # must strictly start with either 01 or 07,
  "longitude": "34.123",
  "latitude": "0.1234",
  "isSpecial": false (default)# this will enable us differentiate between farmers and experts
  "documents" [a file] # when a user checks the isSpecial box, he/she should upload a document which will be reviewed by admin.
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
   "authCode": "HG123D" # verification code sent to email
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
