export const MOCK_USERS = {
  "admin@farmlink.com": { password: "admin123", role: "admin", name: "Alex Kimani", email: "admin@farmlink.com", initials: "AK" },
  "vendor@farmlink.com": { password: "vendor123", role: "vendor", name: "Victor Ochieng", email: "vendor@farmlink.com", initials: "VO" },
};

export const VENDOR_DASH = {
  totalRevenue: 62000, pendingOrders: 4, deliveredOrders: 6,
  currentMonthOrders: 10, previousMonthOrders: 0, percentageChange: "0.00",
  bestSellingProducts: [], monthlyOrders: [], monthlyRevenue: []
};

export const ADMIN_DASH = {
  userData: [{ totalUsers:[{count:7}], verifiedUsers:[{count:7}], pendingApprovals:[], approvedUsers:[{count:6}],
    roleDistribution:[{_id:"admin",count:2},{_id:"expert",count:1},{_id:"vendor",count:3},{_id:"farmer",count:1}],
    recentUsers:[{count:2}], userGrowth:[{_id:3,count:6},{_id:6,count:1}] }],
  salesData:[{monthlyRevenue:[{_id:4,totalSales:2}],totalRevenue:[{_id:null,totalSales:2}]}],
  orderData:[{totalOrders:[{count:2}],pendingOrders:[{count:1}],shippedOrders:[],deliveredOrders:[{count:1}],monthlyOrders:[{_id:4,count:2,revenue:2}]}]
};

export const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export const initOrders = [
  { id:"ORD-001", products:[{product:{_id:"p1",title:"Maize Seeds Premium"},quantity:2,price:500}],
    totalAmount:1000, checkoutRequestId:"ws_CO_14042025144937057111768132", paymentStatus:"completed",
    paymentMethod:"mpesa", deliveryStatus:"pending", orderAddress:"LBB, Kakamega", farmerPhoneNumber:"0111768132", createdAt:"2025-04-14" },
  { id:"ORD-002", products:[{product:{_id:"p2",title:"DAP Fertilizer 50kg"},quantity:1,price:3200}],
    totalAmount:3200, checkoutRequestId:"ws_CO_15042025091234567890123456", paymentStatus:"completed",
    paymentMethod:"mpesa", deliveryStatus:"delivered", orderAddress:"Milimani, Kisumu", farmerPhoneNumber:"0722345678", createdAt:"2025-04-15" },
  { id:"ORD-003", products:[{product:{_id:"p3",title:"Dursban Pesticide"},quantity:3,price:450}],
    totalAmount:1350, checkoutRequestId:"ws_CO_16042025101234567890654321", paymentStatus:"pending",
    paymentMethod:"mpesa", deliveryStatus:"pending", orderAddress:"Eldoret Town, Uasin Gishu", farmerPhoneNumber:"0733456789", createdAt:"2025-04-16" },
  { id:"ORD-004", products:[{product:{_id:"p4",title:"Drip Irrigation Kit"},quantity:1,price:8500}],
    totalAmount:8500, checkoutRequestId:"ws_CO_17042025121234567890987654", paymentStatus:"completed",
    paymentMethod:"mpesa", deliveryStatus:"pending", orderAddress:"Thika Road, Nairobi", farmerPhoneNumber:"0744567890", createdAt:"2025-04-17" },
  { id:"ORD-005", products:[{product:{_id:"p1",title:"Maize Seeds Premium"},quantity:5,price:500},{product:{_id:"p5",title:"CAN Fertilizer 25kg"},quantity:2,price:1200}],
    totalAmount:4900, checkoutRequestId:"ws_CO_18042025141234567890111222", paymentStatus:"completed",
    paymentMethod:"mpesa", deliveryStatus:"delivered", orderAddress:"Nakuru CBD, Nakuru", farmerPhoneNumber:"0755678901", createdAt:"2025-04-18" },
  { id:"ORD-006", products:[{product:{_id:"p6",title:"Greenhouse Polythene"},quantity:1,price:12000}],
    totalAmount:12000, checkoutRequestId:"ws_CO_19042025161234567890333444", paymentStatus:"failed",
    paymentMethod:"mpesa", deliveryStatus:"pending", orderAddress:"Kitale Town, Trans Nzoia", farmerPhoneNumber:"0766789012", createdAt:"2025-04-19" },
];

export const initProducts = [
  { id:"prod-1", name:"Maize Seeds Premium", description:"High-yield hybrid maize seeds, drought-tolerant variety suitable for all altitudes.", category:"Seeds", quantity:200, price:500, images:[] },
  { id:"prod-2", name:"DAP Fertilizer 50kg", description:"Diammonium Phosphate fertilizer for improved root development and yields.", category:"Fertilizers", quantity:45, price:3200, images:[] },
  { id:"prod-3", name:"Dursban Pesticide 1L", description:"Broad-spectrum insecticide for soil and foliar application on cereals.", category:"Pesticides", quantity:80, price:450, images:[] },
  { id:"prod-4", name:"Drip Irrigation Kit", description:"Complete drip irrigation system for 1/8 acre, includes pipes, emitters, and timer.", category:"Equipment", quantity:12, price:8500, images:[] },
  { id:"prod-5", name:"Fresh Tomatoes (1kg)", description:"Grade A cherry tomatoes from greenhouse, pesticide-free.", category:"Produce", quantity:500, price:120, images:[] },
];

export const initVendors = [
  { id:"v1", fname:"Samuel", lname:"Oduya", email:"samuel.oduya@email.com", phone:"0712345678", status:"Approved", documents:["business_permit.pdf","id_copy.jpg"], createdAt:"2025-01-10" },
  { id:"v2", fname:"Grace", lname:"Wanjiku", email:"grace.wanjiku@email.com", phone:"0723456789", status:"Pending", documents:["business_permit.pdf"], createdAt:"2025-02-14" },
  { id:"v3", fname:"Brian", lname:"Otieno", email:"brian.otieno@email.com", phone:"0734567890", status:"Approved", documents:["kra_pin.pdf","id_copy.jpg","business_permit.pdf"], createdAt:"2025-01-28" },
  { id:"v4", fname:"Faith", lname:"Chebet", email:"faith.chebet@email.com", phone:"0745678901", status:"Rejected", documents:["id_copy.jpg"], createdAt:"2025-03-05" },
  { id:"v5", fname:"Moses", lname:"Kamau", email:"moses.kamau@email.com", phone:"0756789012", status:"Pending", documents:["business_permit.pdf","kra_pin.pdf"], createdAt:"2025-03-20" },
];

export const initFarmers = [
  { id:"f1", fname:"John", lname:"Mwangi", email:"john.mwangi@email.com", phone:"0712000001", region:"Central Kenya", joinDate:"2024-11-15", status:"Active" },
  { id:"f2", fname:"Mary", lname:"Auma", email:"mary.auma@email.com", phone:"0723000002", region:"Nyanza", joinDate:"2024-12-01", status:"Active" },
  { id:"f3", fname:"Peter", lname:"Rotich", email:"peter.rotich@email.com", phone:"0734000003", region:"Rift Valley", joinDate:"2025-01-08", status:"Inactive" },
  { id:"f4", fname:"Jane", lname:"Njoroge", email:"jane.njoroge@email.com", phone:"0745000004", region:"Central Kenya", joinDate:"2025-02-20", status:"Active" },
  { id:"f5", fname:"David", lname:"Simiyu", email:"david.simiyu@email.com", phone:"0756000005", region:"Western", joinDate:"2025-03-10", status:"Active" },
];

export const SPECIALIZATIONS = ["Crop Science","Soil Science","Pest Management","Irrigation","General Agronomy"];
export const initExperts = [
  { id:"e1", fname:"Dr. Amina", lname:"Hassan", email:"amina.hassan@farmlink.com", specialization:"Soil Science", experience:12, status:"Active" },
  { id:"e2", fname:"Prof. James", lname:"Mwenda", email:"james.mwenda@farmlink.com", specialization:"Crop Science", experience:18, status:"Active" },
  { id:"e3", fname:"Eng. Rose", lname:"Kipkoech", email:"rose.kipkoech@farmlink.com", specialization:"Irrigation", experience:8, status:"Active" },
  { id:"e4", fname:"Dr. Felix", lname:"Omondi", email:"felix.omondi@farmlink.com", specialization:"Pest Management", experience:10, status:"Inactive" },
];