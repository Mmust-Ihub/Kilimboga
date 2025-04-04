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
6. [IOT](#iot)

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

- **_status code_**: `201`
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

# Farmer

> ## profile
>
> > **request**

- **_url_**: `{{base_url}}/api/v1/farmer/profile`
- **_method:_** `GET`
- **_headers:_**
  - Authorization: Bearer **token**

> > **response**

- ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "johndoe@gmail.com",
    "phoneNumber": "0743512345"
  }
  ```

> ## Statistics
>
> > **request**

- **_url_**: `{{base_url}}/api/v1/farmer/stats`
- **_method:_** `GET`
- **_headers:_**
  - Authorization: Bearer **token**

> > **response**

- ```json
  {
    "greenHouses": 2
  }
  ```

> ## Add a greenhouse
>
> > **request**

- **_url_**: `{{base_url}}/api/v1/farmer/green-house`
- **_method:_** `POST`
- **_headers:_**

  - Authorization: Bearer **token**

- **request_body:**

- ```json
       {
        "name": "first",
        "plant": "cabages",
        "location": {
            "coordinates": [1234, 123.40] "longitude(number), latitude(number)"
        }
    }
  ```

> ## List all greenhouses
>
> > **request**

- **_url_**: `{{base_url}}/api/v1/farmer/green-house`
- **_method:_** `GET`
- **_headers:_**

  - Authorization: Bearer **token**

> > **response:**

- ```json
  [
    {
      "name": "first",
      "farmId": "X5QK8"
    }
  ]
  ```

> ## get a single green house
>
> > **request**

- **_url_**: `{{base_url}}/api/v1/farmer/green-house`
- **_method:_** `GET`
- **_headers:_**

  - Authorization: Bearer **token**

- **_Required query parameters:_**

  | Parameter |  Type  | info       |
  | :-------: | :----: | :--------- |
  |    id     | string | the farmId |

- **_example url_** :

```yaml
url: {{base_url}}/api/v1/farmer/green-house?id=X5QK8
```

> > **response:**

- ```json
  {
    "name": "Simple",
    "plant": "cabages",
    "farmId": "X5QK8",
    "schedule": "The plant growth schedule"
  }
  ```

> ## Pest and Disease Prediction
>
> > **request**

- **_url_**: `{{base_url}}/api/v1/farmer/predict`
- **_method:_** `POST`
- **_headers:_**

  - Authorization: Bearer **token**

- **_Required query parameters:_**

  | Parameter |  Type  | options         |
  | :-------: | :----: | :-------------- |
  |   type    | string | disease or pest |

- **_example url_** :

```yaml
url: {{base_url}}/api/v1/farmer/predict?type=pest
```

- **_request_body:_** (form data)

```json
{ "farmId": "X5QK8", "image": "image" }
```

> > **example response**

- ```json
  {
    "crop": "Tomato",
    "disease": "Tomato fruit worm (Helicoverpa zea) damage",
    "other_crops_infested": [
      "Corn, cotton, peppers, beans, and other vegetables"
    ],
    "cause": ["Larvae of the tomato fruit worm moth bore into the fruit."],
    "life_cycle": [
      "The moths lay eggs on the plant.  Eggs hatch into larvae that feed on the fruit. Larvae pupate in the soil, and emerge as adult moths."
    ],
    "remedy": [
      "Handpick and destroy infested fruits.",
      "Use Bacillus thuringiensis (Bt) based insecticides, following label instructions carefully.  These are generally safer for beneficial insects and the environment.",
      "Consider using pheromone traps to monitor moth populations and reduce mating.",
      "Insecticidal soaps can be effective against younger larvae, but require thorough coverage and may need repeated applications."
    ],
    "preventive_measures": [
      "Rotate crops yearly to disrupt the pest's life cycle.",
      "Remove plant debris and weeds after harvest to eliminate overwintering sites.",
      "Monitor plants regularly for signs of infestation.",
      "Consider using row covers to protect young plants from egg laying.",
      "Use resistant tomato varieties if available."
    ],
    "environment_conditions": [
      "Tomatoes prefer well-drained soil, consistent moisture, and temperatures between 65-85°F (18-29°C).",
      "Avoid excessive watering, which can promote fungal diseases that weaken plants and make them more susceptible to pests."
    ],
    "nutrient_deficiency": [
      "Nutrient deficiencies can weaken plants, making them more vulnerable to pests. Ensure adequate nitrogen, phosphorus, and potassium."
    ],
    "companion_planting": [
      "Basil, marigolds, and certain herbs may repel some pests."
    ],
    "post_harvest_handling": [
      "Handle tomatoes carefully to avoid bruising. Store in a cool, dry place to prevent spoilage."
    ],
    "imageUrl": "https://res.cloudinary.com/dqrw1zi7d/image/upload/v1743182881/kilimboga/rj2irzykbgnhfaguende.jpg",
    "nearbyExperts": [
      {
        "_id": "67dc5d07bb2d7175a2b4d65e",
        "firstName": "Antony",
        "lastName": "Kariuki",
        "email": "kariukiantony113@gmail.com",
        "phoneNumber": "0743596180"
      }
    ]
  }
  ```

## Products

> > **request**

- **_url_**: `{{base_url}}/api/v1/farmer/products`
- **_method:_** `GET`
- **_headers:_**

  - Authorization: Bearer **token**

- **_Optional query parameters:_**

  | Parameter |  Type  | options                                       |
  | :-------: | :----: | :-------------------------------------------- |
  | category  | string | "fertilizers", "seeds", "tools", "pesticides" |
  |   page    |  int   | ie 1                                          |
  |  perPage  |  int   | ie 10                                         |

> > **example response**

- ```json
  {
    "totalProducts": 4,
    "currentPage": 1,
    "totalPages": 1,
    "products": [
      {
        "_id": "67ea91a1a14e9f9b37adeee8",
        "title": "\"Cabages\"",
        "description": "These are cabage seeds",
        "category": "tools",
        "price": 1,
        "quantity": 5,
        "vendorId": "67dedfaccb902e8624c91e68",
        "imageUrl": "https://res.cloudinary.com/dqrw1zi7d/image/upload/v1743425952/kilimboga/msnz1a6v5uvwftof8ltd.jpg",
        "createdAt": "2025-03-31T12:59:13.269Z",
        "updatedAt": "2025-03-31T12:59:13.269Z",
        "__v": 0
      },
    ]
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

  | Parameter |  Type  |        options         |
  | :-------: | :----: | :--------------------: |
  |   state   | string | _pending_, _delivered_ |

- **_example url_** :

```yaml
url: {{base_url}}/api/v1/vendor/orders?state="pending"
```

> > **response**

- **_status_code:_** `200`
- **_response_body:_**
- ```json
  [{}]
  ```

# IOT

```

```

```

```
