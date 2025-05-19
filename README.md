# 🚨 QRaksha - Emergency QR Alert System

QRaksha is a dual-role (Admin/Employee) Emergency QR Alert System that securely manages employee health data and enables real-time emergency communication. It features dynamic QR code generation for employees, real-time SOS alert notifications, and efficient resolution tracking.

## 🌟 Features

- **Dual Role Authentication**  
  Secure login/signup for Admins and Employees using **JWT Authentication**.

- **Dynamic QR Code Generation**  
  Each employee has a QR Code linking to their health profile, generated using the **qrcode** npm package.

- **Real-Time SOS Alerts**  
  Scanning an employee's QR code triggers an SOS alert to the Admin Dashboard via **Socket.io**.

- **Admin Dashboard**  
  - View all employees
  - Monitor active SOS alerts
  - Resolve SOS alerts

- **Employee Profile Management**  
  Employees can update their health information, and their QR codes update automatically.

- **Emergency Contact Integration**  
  Automatically sends emergency details to pre-saved contacts (using **Twilio** integration planned).

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Authentication:** JWT, bcrypt.js
- **Database:** MongoDB (Mongoose ODM)
- **Real-Time Communication:** Socket.io
- **QR Code Generation:** `qrcode` npm package
- **Frontend:** React.js, Tailwind CSS
- **Environment Variables:** dotenv
- **Notifications (Optional):** Twilio API

---

## 🧩 Project Structure (Major APIs)

| Route | Method | Description |
|:------|:-------|:------------|
| `/admin/signup` | POST | Admin Signup |
| `/admin/login` | POST | Admin Login |
| `/admin/employees` | GET | Fetch all employees (Protected) |
| `/admin/sos-alerts` | GET | Fetch all SOS alerts (Protected) |
| `/admin/employee/:id` | GET | Get employee details by ID |
| `/admin/del/employee/:id` | DELETE | Delete employee by ID |
| `/admin/resolve-sos/:id` | DELETE | Resolve a specific SOS alert |

| Route | Method | Description |
|:------|:-------|:------------|
| `/employee/register` | POST | Employee Registration + QR Code Generation |
| `/employee/login` | POST | Employee Login |
| `/employee/edit/:id` | PUT | Edit Employee Profile |
| `/employee/user-profile/:id` | GET | Fetch employee profile (for QR scan) |

| Route | Method | Description |
|:------|:-------|:------------|
| `/sos/:id/sos` | POST | Trigger SOS Alert for Employee |

---

## 🚀 How to Run Locally

1. **Clone the Repository**

```bash
git clone https://github.com/your-username/QRaksha.git
cd QRaksha
