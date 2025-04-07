import toast, { Toaster } from 'react-hot-toast';

function AdminProtected({children}) {
    const user = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');
  
    if(user && user.role == "vendor" && token){
      return children;
    }
  
    window.location.href = '/'
  }
  
  export default AdminProtected;