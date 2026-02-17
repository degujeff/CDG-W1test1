// src/utils/sweetalert.js
import Swal from 'sweetalert2'

// 1. แจ้งเตือนมุมจอ (Toast) - ใช้ตอนบันทึก/แก้ไขเสร็จ
export const Toast = Swal.mixin({
    toast: true,
    position: 'top-end', // มุมขวาบน
    showConfirmButton: false,
    timer: 3000, // 3 วินาทีหายเอง
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

// 2. กล่องยืนยัน (Confirm) - ใช้ตอนจะลบ
export const Confirm = Swal.mixin({
    title: 'คุณแน่ใจไหม?',
    text: "ข้อมูลนี้จะหายไปถาวรเลยนะ!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'ใช่, ลบเลย!',
    cancelButtonText: 'ยกเลิก'
})