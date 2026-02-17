<script setup>
// 1. นำเข้าของจำเป็น
import { ref } from 'vue';
import pdfUtils from '../utils/pdf'; 
import images from '../utils/image.json';

// 1. เตรียมชื่อเดือนภาษาไทย
const thaiMonths = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
];

// 2. ฟังก์ชันดึง "วันนี้" เป็นภาษาไทย (ใช้กำหนดค่าเริ่มต้น)
const getCurrentThaiDate = () => {
  const d = new Date();
  const day = d.getDate();
  const month = thaiMonths[d.getMonth()];
  const year = d.getFullYear() + 543;
  return `${day} ${month} ${year}`;
};

// 2. สร้างตัวแปรเก็บข้อมูล (ใช้ form ก้อนเดียวจบ)
const form = ref({
  projectNo: '12',    
  topic: 'ทดสอบหัวข้อ',
  date: getCurrentThaiDate(),
  fullName: 'เจฟ ทดสอบ',    
  dob: '01/01/2540',
  idCard: '1-2345-67890-12-3',
  age: '25',
  school: 'มหาวิทยาลัยทดสอบ',
  gradeLevel: 'ผลการเรียนดีเด่น',
  gpa: '4.00',

  // --- 1. ที่อยู่ตามภูมิลำเนา (เดิม) ---
  addrNo: '99/9',
  moo: '1',
  soi: 'ซอยทดสอบ',
  road: 'ถนนทดสอบ',
  subDistrict: 'แขวงทดสอบ',
  district: 'เขตทดสอบ',
  province: 'กรุงเทพมหานคร',
  zip: '10000',

  // --- 2. ที่อยู่สำหรับจัดส่งเอกสาร (เพิ่มใหม่) ---
  deliveryAddrNo: '88/8',      
  deliveryMoo: '2',            
  deliverySoi: 'ซอยจัดส่ง',      
  deliveryRoad: 'ถนนจัดส่ง',     
  deliverySubDistrict: 'แขวงจัดส่ง', 
  deliveryDistrict: 'เขตจัดส่ง',    
  deliveryProvince: 'กรุงเทพมหานคร', 
  deliveryZip: '10200',        

  // --- ข้อมูลผู้ปกครอง ---
  parentName: 'นางสมมติ ใจดี',
  parentIdCard: '3-2109-87654-32-1',
  parentPosition: 'พนักงานบริษัท',
  parentDuration: '10 ปี',
  parentPhone: '081-234-5678',
  parentWorkPhone: '02-345-6789',
  parentAffiliation: 'บริษัทจำกัด',
  parentDistrict: 'เขตบางรัก',
  parentProvince: 'กรุงเทพมหานคร',

  // --- ลายเซ็น ---
  applicantName: 'เจฟ ทดสอบ',
  officerName: 'เจ้าหน้าที่ ตรวจสอบ',
  grade: '4.00'
});

// 3. ฟังก์ชันแปลงวันที่จากปฏิทิน (เมื่อ user เลือกใหม่)
const handleDateSelect = (event, fieldName) => {
  const inputDate = event.target.value; // ได้ค่า 2026-02-17
  if (inputDate) {
    const [year, month, day] = inputDate.split('-');
    const thaiYear = parseInt(year) + 543;
    const monthName = thaiMonths[parseInt(month) - 1];
    form.value[fieldName] = `${parseInt(day)} ${monthName} ${thaiYear}`;
  }
};
// --- ฟังก์ชันสำหรับวันเกิด (แบบตัวเลข: 22/10/2550) ---
const handleDOBSelect = (event) => {
  const inputDate = event.target.value; 
  if (inputDate) {
    const [year, month, day] = inputDate.split('-');
    const thaiYear = parseInt(year) + 543;
    // ไม่ต้องแปลงเดือนเป็นชื่อไทย ใช้ตัวเลขเดิมเลย
    form.value.dob = `${day}/${month}/${thaiYear}`;
  }
};

// 4. ฟังก์ชันจัดรูปแบบเลขบัตรประชาชน 
const formatIdCard = (event, fieldName) => {
  let value = event.target.value.replace(/\D/g, '').slice(0, 13); 
  let formatted = '';
  
  if (value.length > 0) formatted += value.slice(0, 1);
  if (value.length > 1) formatted += '-' + value.slice(1, 5);
  if (value.length > 5) formatted += '-' + value.slice(5, 10);
  if (value.length > 10) formatted += '-' + value.slice(10, 12);
  if (value.length > 12) formatted += '-' + value.slice(12, 13);
  
  form.value[fieldName] = formatted;
};

// 5. ฟังก์ชันจัดรูปแบบเบอร์โทร 
const formatPhone = (event, fieldName) => {
  let value = event.target.value.replace(/\D/g, '').slice(0, 10);
  let formatted = '';
  
  if (value.length > 0) formatted += value.slice(0, 3);
  if (value.length > 3) formatted += '-' + value.slice(3, 6);
  if (value.length > 6) formatted += '-' + value.slice(6, 10);
  
  form.value[fieldName] = formatted;
};

// 3. ฟังก์ชันสร้าง PDF (เหมือนคนเขียนใบสั่งงาน)
const createMyPDF = () => {
  const blueprint = {
    pageSize: 'A4',
    pageMargins: [50, 40, 50, 40], 
    defaultStyle: {
      font: 'THSarabunIT9', 
      fontSize: 14,
      lineHeight: 1.3 
    },

    content: [
      {
        image: images.logo, // ✅ เรียกใช้ได้เลย
        width: 60,          // ปรับขนาดตามใจชอบ
        absolutePosition: { x: 40, y: 40 } // 🎯 พิกัดมุมขวาบน
      },
      // ================= ส่วนหัว (Header) =================
      { 
        stack: [
          { text: ['โครงการเยาวชนแถวหน้า ครั้งที่ ', { text: form.value.projectNo, bold: true }], bold: true },
          { text: 'ผลการเรียนดีเด่น และผลงานคลิปสั้น', bold: true },
          { text: 'หัวข้อ "พัฒนาอย่างก้าวกระโดด ด้วย Ai เพื่อพัฒนาชีวิตอย่างยั่งยืนในอนาคต""', bold: true },
        ],
        alignment: 'center', fontSize: 18, margin: [0, 0, 0, 20] 
      },
      { 
        text: ['วันที่ ', { text: form.value.date, bold: true }], 
        alignment: 'right', margin: [0, 0, 0, 20] 
      },

      //   1. ข้อมูลส่วนตัว (Personal Info)   
      {
        columns: [
          { text: ['ชื่อ-นามสกุล  ', { text: form.value.fullName, bold: true }], },
          { text: ['เลขประจำตัวประชาชน ', { text: form.value.idCard, bold: true }], width: 200 }
        ],
        margin: [40, 0, 0, 5] 
      },
      {
        columns: [
          { text: ['วัน/เดือน/ปี พ.ศ. เกิด  ', { text: form.value.dob, bold: true }] },
          { text: ['อายุ ', { text: form.value.age, bold: true }, ' ปี (นับจาก พ.ศ. เกิด)'], width: '200' }
        ],
        margin: [0, 0, 0, 5]
      },
      {
        columnGap: 26, 
        columns: [
          { width: 'auto', text: ['เกรดผลการเรียน ', { text: form.value.gpa, bold: true }] },
          { width: 'auto', text: ['ระดับชั้นที่เรียน ', { text: form.value.gradeLevel, bold: true }] },
          { width: 'auto', text: ['ชื่อสถาบันการศึกษา  ', { text: form.value.school, bold: true }], alignment: 'right' }
        ],
        margin: [0, 0, 0, 5] 
      },
      
      {
        columnGap: 20, 
        columns: [
          { width: 'auto', text: 'ที่อยู่ตามภูมิลำเนาของผู้สมัครผู้รับทุน'  },
          { width: 30, text: '' },
          {width:'auto', text:'บ้านเลขที่ '},
          { width: 20, text: '' },
          {width: 'auto', text: form.value.addrNo, bold: true },
          { width: 20, text: '' },
          { width: 'auto', text: ['หมู่ที่ ', { text: form.value.moo, bold: true }] },
        ],
        margin: [40, 0, 0, 5] 
      },
      {
        columnGap: 15,
        columns: [
          { width: 'auto', text:'ตรอก/ซอย' }, 
          { width: 10, text: '' },
          {width: 'auto', text: form.value.soi, bold: true },
          { width: 95, text: '' },
          { width: 'auto', text: 'ถนน' },
          { width: 10, text: '' },
          { width: 'auto', text: form.value.road, bold: true },
          
        ],
        margin: [0, 0, 0, 5]
      },
      {
        columnGap: 15,
        columns: [
          { width: 'auto', text: ['ตำบล/แขวง ', { text: form.value.subDistrict, bold: true }] },
          { width: 20, text: '' },
          { width: 'auto', text: ['อำเภอ/เขต ', { text: form.value.district, bold: true }] },
           { width: 20, text: '' },
          { width: 'auto', text: ['จังหวัด ', { text: form.value.province, bold: true }, { text: form.value.zip, bold: true }] },
          
        ],
        margin: [0, 0, 0, 5]
      },

      // ================= 3. ที่อยู่จัดส่ง (Mailing Address) =================
      
      {
        columnGap: 20, 
        columns: [
          { width: 'auto', text: 'ที่อยู่สำหรับจัดส่งเอกสารของผู้สมัครผู้รับทุน'  },
          { width: 5, text: '' },
          {width:'auto', text:'บ้านเลขที่ '},
          { width: 20, text: '' },
          {width: 'auto', text: form.value.deliveryAddrNo, bold: true },
          { width: 20, text: '' },
          { width: 'auto', text: ['หมู่ที่ ', { text: form.value.deliveryMoo, bold: true }] },
        ],
        margin: [40, 0, 0, 5] 
      },
      {
        columnGap: 15,
        columns: [
          { width: 'auto', text:'ตรอก/ซอย' }, 
          { width: 10, text: '' },
          {width: 'auto', text: form.value.deliverySoi, bold: true },
          { width: 95, text: '' },
          { width: 'auto', text: 'ถนน' },
          { width: 10, text: '' },
          { width: 'auto', text: form.value.deliveryRoad, bold: true },
          
        ],
        margin: [0, 0, 0, 5]
      },
      {
        columnGap: 15,
        columns: [
          { width: 'auto', text: ['ตำบล/แขวง ', { text: form.value.deliverySubDistrict, bold: true }] },
          { width: 20, text: '' },
          { width: 'auto', text: ['อำเภอ/เขต ', { text: form.value.deliveryDistrict, bold: true }] },
           { width: 20, text: '' },
          { width: 'auto', text: ['จังหวัด ', { text: form.value.deliveryProvince, bold: true }, { text: form.value.deliveryZip, bold: true }] },
          
        ],
        margin: [0, 0, 0, 5]
      },

      // ================= 4. ข้อมูลผู้ปกครอง (Parent Info) =================
      {
        text: [
          { text: 'ข้อมูลของบิดาหรือมารดา ' },
          { text: '(บุคลากรประเภทข้าราชการ ลูกจ้างประจำ พนักงานราชการ '}, 
        ],
        margin: [40, 0, 0, 0]
      },
      {
        text: [
          { text: 'สมาชิกกองอาสารักษาดินแดน กำนัน ผู้ใหญ่บ้าน และลูกจ้างเหมาบริการ ที่ปฎิบัติงานที่ติดต่อกันมาเเล้วไม่น้อยกว่า 1'},  
          
        ],
        margin: [0, 0, 0, 0]
      },
      {
        text: [
          { text: 'ปี นับถึงวันเปิดรับสมัครของกรมการปกครอง) '} 
        ],
        margin: [0, 0, 0, 0]
      },
      {
        columns: [
          { width: 260, text: ['ชื่อ-สกุล ', { text: form.value.parentName, bold: true }] },
          { width: '*', text: '' },
          {width: 280, text: ['เลขประจำตัวประชาชน ', { text: form.value.parentIdCard, bold: true }] }
        ],
        margin: [0, 0, 0, 5]
      },
      
      {
        columns: [
          
          { width: 260, text: ['ตำแหน่ง ', { text: form.value.parentPosition, bold: true }] },     
          { width: 'auto', text: ['ระยะเวลาปฏิบัติงาน ', { text: form.value.parentDuration, bold: true }] }    ],
            margin: [0, 0, 0, 5]
      },

      {
        columns: [

          { width: 280, text: ['โทรศัพท์มือถือ (ส่วนตัว) ', { text: form.value.parentPhone, bold: true }] },
          
          {  width: 'auto', text: ['โทรศัพท์มือถือ (ที่ทำงาน) ', { text: form.value.parentWorkPhone, bold: true }] }
        ],
        margin: [0, 0, 0, 5]
      },
      {
        columnGap: 100,
        columns: [
          { width: 'auto', text: ['สังกัด ', { text: form.value.parentAffiliation, bold: true }] },
          // { width: '*', text: '' },       
          { width: 'auto', text: ['อำเภอ/เขต ', { text: form.value.parentDistrict, bold: true }] },
          // { width: '*', text: '' },
          { width: 'auto', text: ['จังหวัด ', { text: form.value.parentProvince, bold: true }] }
        ],
        margin: [0, 0, 0, 0] 
      },

      //   5. ส่วนลงชื่อ (Signature)   
      { 
        text: ['ประสงค์สมัครและส่งผลงานประกวดประเภท ', { text: form.value.gradeLevel, bold: true }, ' เกรดเฉลี่ยสะสม ', { text: form.value.gpa, bold: true }], 
        alignment: 'left', 
        margin: [0, 0, 0, 40] 
      },
      
      // 1. ลายเซ็นผู้สมัคร (อยู่ด้านบน)
      {
        stack: [
             'ลายมือชื่อ..........................................................ผู้สมัคร',
             { text: `( ${form.value.applicantName} )`, bold: true, margin: [0, 5, 0, 0] }
        ],
        alignment: 'center', 
        margin: [0, 0, 0, 30] 
      },

      // 2. ลายเซ็นเจ้าหน้าที่ (อยู่ด้านล่าง ต่อท้ายกันลงมา)
      {
        stack: [
             'ลายมือชื่อ..........................................................เจ้าหน้าที่',
             { text: `( ${form.value.officerName} )`, bold: true, margin: [0, 5, 0, 0] },
             { text: 'เจ้าหน้าที่อำเภอ', fontSize: 14 }
        ],
        alignment: 'center',
        margin: [0, 0, 0, 0] 
      }
            ]
       
  };

  pdfUtils.pdfPrintPreview(blueprint);
};
</script>

<template>
  <div style="padding: 50px; text-align: center; font-family: sans-serif;">
    <h1>กรอกข้อมูลใบสมัคร 📝</h1>
    
    <div style="max-width: 600px; margin: 0 auto; text-align: left;">
      
      <h3 style="background-color: #eee; padding: 10px;">1. ข้อมูลทั่วไป</h3>
      
      <!-- <label>ครั้งที่:</label><br>
      <input v-model="form.projectNo" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" />

      <label>หัวข้อโครงการ:</label><br>
      <input v-model="form.topic" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" /> -->

      <label>วันที่ทำเอกสาร:</label><br>
      <input 
        v-model="form.date" 
        disabled 
        style="width: 100%; background: #f0f0f0; border: 1px solid #ccc; padding: 10px; font-size: 18px; margin-bottom: 15px;" 
      />
      <h3 style="background-color: #eee; padding: 10px;">2. ข้อมูลส่วนตัว</h3>

      <label>ชื่อ-นามสกุล:</label><br>
      <input v-model="form.fullName" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" />

      <label>วันเกิด (วว/ดด/ปปปป):</label><br>
      <div style="display: flex; gap: 10px;">
        <input 
          type="date" 
          @change="handleDOBSelect" 
          style="padding: 10px; font-size: 18px;" 
        />
        <input v-model="form.dob" disabled style="background: #f0f0f0; border: 1px solid #ccc; padding: 10px; font-size: 18px;" />
      </div>

      <label>เลขบัตรประชาชน:</label><br>
      <input 
        :value="form.idCard" 
        @input="(e) => formatIdCard(e, 'idCard')"
        maxlength="17"
        placeholder="x-xxxx-xxxxx-xx-x"
        style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" 
      />

      <label>อายุ:</label><br>
      <input v-model="form.age" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" />

      <label>โรงเรียน/สถาบัน:</label><br>
      <input v-model="form.school" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" />

      <label>ระดับชั้น:</label><br>
      <input v-model="form.gradeLevel" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" />

      <label>GPA:</label><br>
      <input v-model="form.gpa" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" />

      <h3 style="background-color: #eee; padding: 10px;">3. ที่อยู่</h3>

      <div style="display: flex; gap: 10px;">
        <div style="flex: 1;">
          <label>บ้านเลขที่:</label><br>
          <input v-model="form.addrNo" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px;" />
        </div>
        <div style="flex: 1;">
          <label>หมู่ที่:</label><br>
          <input v-model="form.moo" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px;" />
        </div>
      </div>
      <br>

      <label>ตรอก/ซอย:</label><br>
      <input v-model="form.soi" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" />

      <label>ถนน:</label><br>
      <input v-model="form.road" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" />

      <label>แขวง/ตำบล:</label><br>
      <input v-model="form.subDistrict" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" />

      <label>เขต/อำเภอ:</label><br>
      <input v-model="form.district" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" />

      <label>จังหวัด:</label><br>
      <input v-model="form.province" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" />

      <label>รหัสไปรษณีย์:</label><br>
      <input v-model="form.zip" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" />
      
      <h3 style="background-color: #eee; padding: 10px;">3. ที่อยู่สำหรับจัดส่งเอกสาร</h3>
      <label>บ้านเลขที่:</label><br>
      <input v-model="form.deliveryAddrNo" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px;" />
      <br>
      <div style="display: flex; gap: 20px;">
        <div style="flex: 1;">
          <label>หมู่ที่:</label><br>
          <input v-model="form.deliveryMoo" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px;" />
        </div>
      </div>
      <br>

      <label>ตรอก/ซอย:</label><br>
      <input v-model="form.deliverySoi" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" />

      <label>ถนน:</label><br>
      <input v-model="form.deliveryRoad" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" />

      <label>แขวง/ตำบล:</label><br>
      <input v-model="form.deliverySubDistrict" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" />

      <label>เขต/อำเภอ:</label><br>
      <input v-model="form.deliveryDistrict" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" />

      <label>จังหวัด:</label><br>
      <input v-model="form.deliveryProvince" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" />

      <label>รหัสไปรษณีย์:</label><br>
      <input v-model="form.deliveryZip" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" />


      <h3 style="background-color: #eee; padding: 10px;">4. ข้อมูลผู้ปกครอง (แม่)</h3>

      <label>ชื่อ-สกุล มารดา:</label><br>
      <input v-model="form.parentName" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" />

      <label>เลขบัตรฯ มารดา:</label><br>
      <input v-model="form.parentIdCard" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" />

      <label>ตำแหน่งงาน:</label><br>
      <input v-model="form.parentPosition" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" />

      <label>ระยะเวลาทำงาน:</label><br>
      <input v-model="form.parentDuration" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" />

      <label>เบอร์โทร (ส่วนตัว):</label><br>
      <input v-model="form.parentPhone" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" />

      <label>เบอร์โทร (ที่ทำงาน):</label><br>
      <input v-model="form.parentWorkPhone" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" />

      <label>สังกัด:</label><br>
      <input v-model="form.parentAffiliation" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" />

      <label>อำเภอ/เขต (ที่ทำงาน):</label><br>
      <input v-model="form.parentDistrict" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" />

      <label>จังหวัด (ที่ทำงาน):</label><br>
      <input v-model="form.parentProvince" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" />

      <h3 style="background-color: #eee; padding: 10px;">5. ชื่อสำหรับเซ็นเอกสาร</h3>

      <label>ชื่อผู้สมัคร (ตัวบรรจง):</label><br>
      <input v-model="form.applicantName" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" />

      <label>ชื่อเจ้าหน้าที่ (ตัวบรรจง):</label><br>
      <input v-model="form.officerName" style="width: 100%; border: 2px solid blue; padding: 10px; font-size: 18px; margin-bottom: 15px;" />

      <br><br>
      <button @click="createMyPDF" style="width: 100%; background: green; color: white; padding: 15px; font-size: 24px; cursor: pointer; border: none; border-radius: 8px;">
        🖨️ กดปุ่มนี้เพื่อสร้าง PDF
      </button>
      
    </div>
  </div>
</template>