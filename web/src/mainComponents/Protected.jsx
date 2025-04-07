function Protected({children}) {
  const user = sessionStorage.getItem('user');
  const token = sessionStorage.getItem('token');

  if(user && user.role != "farmer" && token){
    return children;
  }

  window.location.href = '/'
}

export default Protected;