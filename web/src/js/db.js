class Database {
  // baseUrl = 'https://db5rhc6r-3000.inc1.devtunnels.ms';
  baseUrl = "https://kilimboga.vercel.app";
  // baseUrl = 'https://db5rhc6r-3000.inc1.devtunnels.ms';

  async register(user) {
    const formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("phoneNumber", user.phoneNumber);
    formData.append("longitude", user.longitude);
    formData.append("latitude", user.latitude);
    formData.append("isSpecial", user.isSpecial);
    formData.append("documents", user.documents[0]);
    formData.append("role", user.role);

    let response = {
      status: false,
      message: "",
    };

    try {
      const res = await fetch(`${this.baseUrl}/api/v1/auth/register`, {
        method: "POST",
        body: formData,
      });

      const resData = await res.json();

      console.log(resData);

      response = {
        status: resData.status,
        message: resData.message,
      };

      return response;
    } catch (err) {
      console.log(err);

      response = {
        status: false,
        message: err.message,
      };

      return response;
    }
  }

  async verify(code) {
    const formData = new FormData();
    formData.append("authCode", code);

    let response = {
      status: false,
      message: "",
    };

    try {
      const res = await fetch(`${this.baseUrl}/api/v1/auth/verify`, {
        method: "POST",
        body: formData,
      });

      const resData = await res.json();

      console.log(resData);

      response = {
        status: true,
        message: resData.success,
      };

      return response;
    } catch (err) {
      console.log(err);

      response = {
        status: false,
        message: err.failed,
      };

      return response;
    }
  }

  async login(user) {
    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("password", user.password);

    let response = {
      status: false,
      message: "",
    };

    try {
      const res = await fetch(`${this.baseUrl}/api/v1/auth/login`, {
        method: "POST",
        body: formData,
      });

      const resData = await res.json();

      if (
        resData.status == 200 ||
        resData.status == "success" ||
        resData.status == true
      ) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        sessionStorage.setItem("token", JSON.stringify(resData.token));
        sessionStorage.setItem("user", JSON.stringify(resData.user));

        response = {
          status: true,
          message: "Login successful",
          user: resData.user,
          token: resData.token,
        };

        return response;
      } else {
        console.log(resData);
        throw new Error(resData.message);
      }
    } catch (err) {
      console.log(err);

      response = {
        status: false,
        message: err.message || "Login failed",
      };

      return response;
    }
  }

  // Vendor
  async vendorStats(token) {
    try {
      const res = await fetch(`${this.baseUrl}/api/v1/vendor/stats`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const resData = await res.json();

      let response = {
        status: true,
        message: "Data fetched successfully",
        data: resData,
      };

      return response;
    } catch (err) {
      console.log(err);

      let response = {
        status: false,
        message: "Error when fetching data",
      };

      return response;
    }
  }

  async vendorProfile(token) {
    try {
      const res = await fetch(`${this.baseUrl}/api/v1/vendor/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const resData = await res.json();

      console.log(resData);

      response = {
        status: true,
        message: "Data fetched successfully",
        stats: resData,
      };

      return response;
    } catch (err) {
      console.log(err);

      response = {
        status: false,
        message: "Error when fetching data",
      };

      return response;
    }
  }

  // Product
  async addProduct(token, product) {
    const formData = new FormData();
    formData.append("title", product.productName);
    formData.append("description", product.productDescription);
    formData.append("price", product.productPrice);
    formData.append("category", product.productCategory);
    formData.append("image", product.productImage);
    formData.append("quantity", product.productQuantity);

    try {
      const res = await fetch(`${this.baseUrl}/api/v1/vendor/product`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const resData = await res.json();

      console.log(resData);

      let response = {
        status: true,
        message: resData.message,
      };

      return response;
    } catch (err) {
      console.log(err);

      let response = {
        status: false,
        message: "Error when adding product",
      };

      return response;
    }
  }

  async getProducts(token) {
    try {
      const res = await fetch(`${this.baseUrl}/api/v1/vendor/products`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const resData = await res.json();

      let response = {
        status: true,
        message: "Products fetched successfully",
        data: resData,
      };

      return response;
    } catch (err) {
      console.log(err);

      let response = {
        status: false,
        message: "Error when fetching products",
      };

      return response;
    }
  }

  async editProduct(token, product) {
    const formData = new FormData();
    formData.append("title", product.productName);
    formData.append("description", product.productDescription);
    formData.append("price", product.productPrice);
    formData.append("category", product.productCategory);
    formData.append("image", product.productImage);
    formData.append("quantity", product.productQuantity);

    try {
      const res = await fetch(
        `${this.baseUrl}/api/v1/vendor/product?id=${product.productId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const resData = await res.json();

      console.log(resData);

      return {
        status: true,
        message: "Product updated successfully",
        data: resData,
      };
    } catch (err) {
      console.error(err);

      return {
        status: false,
        message: err.message || "Error when updating product",
      };
    }
  }

  async deleteProduct(token, id) {
    try {
      console.log(id);
      const res = await fetch(
        `${this.baseUrl}/api/v1/vendor/product?id=${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status !== 204) {
        throw new Error("Error when deleting product");
      }

      let response = {
        status: true,
        message: "Product deleted successfully",
      };

      return response;
    } catch (err) {
      console.log(err);

      let response = {
        status: false,
        message: "Error when deleting product",
      };

      return response;
    }
  }

  // Orders
  async getOrders(token, state) {
    try {
      const res = await fetch(
        `${this.baseUrl}/api/v1/vendor/orders?state=${state}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resData = await res.json();

      console.log(resData);

      return {
        status: true,
        message: `${state} orders fetched successfully`,
        data: resData,
      };
    } catch (err) {
      console.log(err);

      return {
        status: false,
        message: `Error when fetching ${state} orders`,
      };
    }
  }

  // Admin
  async getAdminStats(token) {
    try {
      const res = await fetch(`${this.baseUrl}/api/v1/admin/stats`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const resData = await res.json();

      return {
        status: true,
        message: `Stats fetched successfully`,
        data: resData,
      };
    } catch (err) {
      console.log(err);

      return {
        status: false,
        message: `Error when fetching stats`,
      };
    }
  }

  async getAdminUsers(token, role, status) {
    try {
      const res = await fetch(
        `${this.baseUrl}/api/v1/admin/users?role=${role}&isApproved=${status}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resData = await res.json();

      console.log(resData);

      return {
        status: true,
        message: `${role} ${status} Users fetched successfully`,
        data: resData,
      };
    } catch (err) {
      console.log(err);

      return {
        status: false,
        message: `Error when fetching ${role} ${status} users`,
      };
    }
  }

  async getAdminUser(token, id) {
    try {
      const res = await fetch(`${this.baseUrl}/api/v1/admin/user/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const resData = await res.json();

      console.log(resData);

      return {
        status: true,
        message: `User fetched successfully`,
        data: resData,
      };
    } catch (err) {
      console.log(err);

      return {
        status: false,
        message: `Error when fetching user`,
      };
    }
  }

  async manageUser(token, id, action) {
    const formData = new FormData();
    formData.append("id", id);

    console.log(token, id, action);

    try {
      const res = await fetch(
        `${this.baseUrl}/api/v1/admin/users?action=${action}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const resData = await res.json();

      console.log(resData);

      if (resData.status == "success") {
        return {
          status: true,
          message: resData.message,
        };
      } else {
        throw new Error(resData.message);
      }
    } catch (err) {
      console.log(err);

      return {
        status: false,
        message: `Error when ${action}ing user`,
      };
    }
  }
}

export default Database;
