import React, { useState, useMemo } from 'react';
import {
  Users, Building2, FileText, BarChart3, Settings, LogOut,
  Search, Bell, ChevronDown, Plus, Edit2, Trash2, Eye,
  CheckCircle2, Clock, XCircle, Upload, Calendar, Briefcase,
  UserCheck, Home, Save, X, FileCheck, ShieldCheck, Send,
  Printer, FolderOpen, CreditCard, PhoneCall, CheckSquare,
  ListChecks, Sparkles, ChevronRight, UserPlus, FilePlus,
  Cake, CalendarClock, Network, FileSignature, ClipboardCheck
} from 'lucide-react';

// --- ข้อมูลตัวเลือก Dropdown ทั้งหมดตามไฟล์ PDF ---
const CLIENT_STATUS_OPTIONS = ['อยู่ในสัญญา', 'หมดสัญญา'];

const INITIAL_MAIN_COMPANIES = [
  { id: 'COMP001', code: 'SPD001', nameTh: 'บริษัท สปีดี้ แพคเก็จ เอ็กซ์เพรส จำกัด (สำนักงานใหญ่)', nameEn: 'Speedy Package Express Co.,Ltd.', header: 'Speedy Package Express', footer: 'Fast Delivery, Better Service', taxId: '0105551234567', address: '123/45 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพมหานคร 10110', phone: '02-123-4567', fax: '02-123-4568', email: 'info@speedy.co.th' },
  { id: 'COMP002', code: 'PNC002', nameTh: 'บริษัท พินนาเคิล ซอร์ส จำกัด (สำนักงานใหญ่)', nameEn: 'Pinnacle Source Co.,Ltd.', header: 'Pinnacle Source', footer: 'Smart Outsourcing Solutions', taxId: '0105559876543', address: '456 อาคารพหลโยธิน แขวงจตุจักร เขตจตุจักร กรุงเทพมหานคร 10900', phone: '02-987-6543', fax: '02-987-6544', email: 'contact@pinnacle.co.th' },
  { id: 'COMP003', code: 'PPT003', nameTh: 'บริษัท พิมพ์พิชญ์ เทรดดิง จำกัด', nameEn: 'Pimpich Trading Co.,Ltd.', header: 'Pimpich Trading', footer: 'Quality & Trust', taxId: '0105554567890', address: '789 ถนนวิภาวดีรังสิต แขวงลาดยาว เขตจตุจักร กรุงเทพมหานคร 10900', phone: '02-111-2222', fax: '02-111-2223', email: 'admin@pimpich.co.th' }
];

const STAFF_POSITIONS = [
  'กรรมการผู้จัดการ', 'รองกรรมการผู้จัดการ', 'เลขานุการกรรมการผู้จัดการ',
  'ผู้จัดการฝ่ายบัญชี', 'หัวหน้าฝ่ายบัญชี', 'ธุรการฝ่ายบัญชี',
  'ผู้จัดการฝ่ายขายและการตลาด', 'ธุรการฝ่ายขายและการตลาด',
  'ผู้จัดการฝ่ายบุคคล', 'หัวหน้าฝ่ายบุคคลอาวุโส', 'ธุรการฝ่ายบุคคล',
  'หัวหน้าแผนก', 'เจ้าหน้าที่ฝ่ายปฏิบัติการ', 'เจ้าหน้าที่ฝ่ายไอที'
];

const STAFF_DEPARTMENTS = [
  'ฝ่ายบริหาร', 'ฝ่ายบุคคลและธุรการ', 'ฝ่ายบัญชีและการเงิน', 'ฝ่ายปฏิบัติการ', 'ฝ่ายขายและการตลาด'
];

const STAFF_STATUSES = ['ปฏิบัติงาน', 'พักงาน', 'ลาออก', 'ไล่ออก', 'ย้ายงาน'];

const BANKS = [
  'ธนาคาร กสิกรไทย จำกัด (มหาชน)', 'ธนาคาร กรุงเทพ จำกัด (มหาชน)', 'ธนาคาร กรุงไทย จำกัด (มหาชน)',
  'ธนาคาร กรุงศรีอยุธยา จำกัด (มหาชน)', 'ธนาคาร ออมสิน จำกัด (มหาชน)', 'ธนาคาร ธนชาติ จำกัด (มหาชน)',
  'ธนาคารเพื่อการเกษตร', 'ธนาคาร อิสลาม จำกัด (มหาชน)'
];

const BANK_ACCOUNT_TYPES = ['ออมทรัพย์', 'กระแสรายวัน', 'ฝากประจำ'];

const MARITAL_STATUSES = ['โสด', 'สมรส', 'หย่า', 'หม้าย'];
const MILITARY_STATUSES = ['รับราชการแล้ว', 'ได้รับการผ่อนผัน', 'จบ ร.ด.', 'จับใบดำ-แดง', 'ได้รับการยกเว้น'];
const EDUCATION_LEVELS = ['ป.4', 'ป.6', 'ป.7', 'ม.3', 'ม.6', 'ปวช.', 'ปวส.', 'ปวท.', 'ปริญญาตรี', 'ปริญญาโท', 'ปริญญาเอก', 'อื่นๆ'];
const LANGUAGES = ['ภาษาอังกฤษ', 'ภาษาเยอรมัน', 'ภาษาฝรั่งเศส', 'ภาษาจีน', 'ภาษาเกาหลี', 'ภาษาญี่ปุ่น', 'อื่นๆ'];
const LANGUAGE_LEVELS = ['พอใช้', 'ดี', 'ดีมาก'];
const DRIVER_LICENSE_TYPES = ['ส่วนบุคคล 1 ปี', 'ส่วนบุคคล 5 ปี', 'ส่วนบุคคล ตลอดชีพ', 'ท.1', 'ท.2', 'ท.3', 'ท.4'];

const INTERVIEW_RESULTS = ['ผ่าน', 'ไม่ผ่าน', 'รอการพิจารณา'];
const EVALUATION_RESULTS = ['ผ่าน', 'ไม่ผ่าน'];

const AFFILIATE_SITES = [
  'ธนาคารกสิกรไทย (งาน OFFICE) สำนักงานใหญ่',
  'ราชวิทยาลัยจุฬาภรณ์',
  'ธนาคารกรุงเทพ (สำนักงานใหญ่ สีลม)',
  'ธนาคารกรุงเทพ (พระราม 3)',
  'บริษัท วิทยุการบินแห่งประเทศไทย จำกัด',
  'บริษัท กนกศิลป์ (ไทยแลนด์) จำกัด',
  'บริษัท บีอีซี แอสเซท จำกัด',
  'สำนักงานคุมประพฤติกรุงเทพมหานคร 10',
  'บริษัท พานาโซนิค เอเนอร์จี (ประเทศไทย) จำกัด',
  'การไฟฟ้านครหลวง / เขตราษฎร์บูรณะ',
  'การไฟฟ้านครหลวง / เขตบางขุนเทียน',
  'การไฟฟ้านครหลวง / บางคอแหลม',
  'การไฟฟ้านครหลวง / เขตยานนาวา',
  'การไฟฟ้านครหลวง / เขตวัดเลียบ',
  'การไฟฟ้านครหลวง / เขตลาดกระบัง'
];

export default function App() {
  // --- Navigation States ---
  const [activeMenu, setActiveMenu] = useState('dashboard'); // dashboard | master | records | attachments | status | reports | settings
  const [masterTab, setMasterTab] = useState('company'); // company | affiliate | staff
  const [recordSubTab, setRecordSubTab] = useState('application'); // application | docCheck | interview | background | referInterview | referWork | guarantee
  const [attachmentDoc, setAttachmentDoc] = useState('appForm'); // appForm | attachedDocs | consentCollect | employmentContract | probationLetter | pdpaMemo | consentForm

  // --- Shared Toast Notification ---
  const [toast, setToast] = useState(null);
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // --- 1. Master Database State ---
  const [mainCompanies, setMainCompanies] = useState(INITIAL_MAIN_COMPANIES);
  const [companyForm, setCompanyForm] = useState(INITIAL_MAIN_COMPANIES[0]);

  const [affiliates, setAffiliates] = useState([
    {
      id: 'CUST001', status: 'อยู่ในสัญญา', name: 'ธนาคารกสิกรไทย (งาน OFFICE) สำนักงานใหญ่', jobName: 'งานบริการรับ-ส่งเอกสารและพัสดุ',
      address: '1 ซอยราษฎร์บูรณะ 27/1 แขวงราษฎร์บูรณะ เขตราษฎร์บูรณะ กรุงเทพฯ 10140', phone: '02-888-8888', email: 'hr-vendor@kasikornbank.com',
      underCompany: 'บริษัท สปีดี้ แพคเก็จ เอ็กซ์เพรส จำกัด (สำนักงานใหญ่)', startDate: '2025-01-01', endDate: '2025-12-31',
      value: '5,000,000.00', penalty: '5,000.00', staffCount: 50, reserveCount: 5, note: 'ต่อสัญญารายปี',
      contacts: [
        { id: 1, name: 'คุณสมชาย ใจดี', dept: 'จัดซื้อ', phone: '081-111-2222', email: 'somchai@ex.com', note: 'ผู้ประสานงานหลัก' },
        { id: 2, name: 'คุณสุภาวดี มีสุข', dept: 'บุคคล', phone: '081-333-4444', email: 'supawadee@ex.com', note: '' }
      ]
    }
  ]);
  const [affiliateForm, setAffiliateForm] = useState(affiliates[0]);
  const [newContact, setNewContact] = useState({ name: '', dept: '', phone: '', email: '', note: '' });

  const [staffList, setStaffList] = useState([
    {
      seq: 1, code: 'EMP001', name: 'นางสาวอรทัย ใจดี', position: 'เจ้าหน้าที่ฝ่ายปฏิบัติการ', department: 'ฝ่ายปฏิบัติการ',
      photo: null, idCard: '1234567890123', address: '99/9 ถนนตัวอย่าง แขวงตัวอย่าง เขตตัวอย่าง กรุงเทพฯ 10110',
      phone: '081-555-6666', email: 'orathai@speedy.co.th', workStatus: 'ปฏิบัติงาน', startDate: '2025-01-01', resignDate: '',
      bank: 'ธนาคาร กรุงเทพ จำกัด (มหาชน)', accountType: 'ออมทรัพย์', accountNo: '123-4-56789-0',
      emergencyName: 'คุณแม่ ใจดี', emergencyWork: 'ธุรกิจส่วนตัว', emergencyPhone: '089-999-8888', emergencyNote: 'มารดา'
    },
    {
      seq: 2, code: 'EMP002', name: 'นายพิชัย รักงาน', position: 'ธุรการฝ่ายบุคคล', department: 'ฝ่ายบุคคลและธุรการ',
      photo: null, idCard: '1100200300405', address: '45/12 ซอยลาดพร้าว 101 กรุงเทพฯ 10240',
      phone: '086-444-3322', email: 'pichai@speedy.co.th', workStatus: 'ปฏิบัติงาน', startDate: '2024-06-15', resignDate: '',
      bank: 'ธนาคาร กสิกรไทย จำกัด (มหาชน)', accountType: 'ออมทรัพย์', accountNo: '045-2-99881-1',
      emergencyName: 'นางสมหญิง รักงาน', emergencyWork: 'รับราชการ', emergencyPhone: '081-222-3344', emergencyNote: 'คู่สมรส'
    }
  ]);
  const [staffForm, setStaffForm] = useState(staffList[0]);

  // --- 2. Records & Applicants State ---
  const [applicants, setApplicants] = useState([
    {
      appId: 'APP-2568-001', applyDate: '2025-10-20', position: 'เจ้าหน้าที่ฝ่ายปฏิบัติการ', expectedSalary: '18,000.00',
      fullNameTh: 'นางสาวณัฐธิดา ใจดี', fullNameEn: 'Miss Natthida Jaidee', idCard: '1100800991122',
      idIssueDate: '2020-05-10', idExpiryDate: '2029-05-09', houseNo: '88/12', moo: '4', road: 'สุขุมวิท',
      subdistrict: 'บางนา', district: 'บางนา', province: 'กรุงเทพมหานคร', homePhone: '02-399-1122',
      mobilePhone: '089-123-4567', birthDate: '1998-05-15', weight: '52.00', height: '165.00',
      race: 'ไทย', nationality: 'ไทย', religion: 'พุทธ',
      fatherName: 'นายสมศักดิ์ ใจดี', fatherJob: 'ค้าขาย', motherName: 'นางสมพร ใจดี', motherJob: 'แม่บ้าน',
      siblingsCount: 2, birthOrder: 1, livingWith: 'บิดา-มารดา', residencePhone: '02-399-1122',
      maritalStatus: 'โสด', spouseName: '', spousePhone: '', childrenCount: 0, isPregnant: false, pregnantMonths: 0,
      militaryStatus: 'ได้รับการยกเว้น',
      eduLevel: 'ปริญญาตรี', institute: 'มหาวิทยาลัยรามคำแหง', eduProvince: 'กรุงเทพมหานคร', gpa: '3.15',
      major: 'การจัดการทั่วไป', gradYear: '2564', language: 'ภาษาอังกฤษ', langLevel: 'ดี',
      typingTh: '45.00', typingEn: '40.00', compWord: true, compExcel: true, compPowerpoint: true,
      hasLicense: true, hasMotoLicense: true, hasCarLicense: true, licenseType: 'ส่วนบุคคล 5 ปี',
      licenseIssueDate: '2022-01-15', licenseExpiryDate: '2027-01-14',
      lastCompany: 'บริษัท เอ็กซ์เพรส โลจิสติกส์ จำกัด', lastPosition: 'ธุรการประสานงาน', lastSalary: '16,500.00',
      lastDuration: '2', leaveReason: 'ต้องการความก้าวหน้า',
      emergencyName: 'นายสมศักดิ์ ใจดี', emergencyRelation: 'บิดา', emergencyPhone: '081-999-0001',
      jobSource: 'เว็บไซต์สมัครงาน', hasCriminalRecord: false, criminalDetail: '', pdpaConsent: true,
      status: 'ผ่านการคัดเลือก',
      docCheck: {
        checkId: 'CHK-001', checkDate: '2025-10-20', photo: true, idCard: true, houseReg: true,
        education: true, carLicense: true, licenseType: 'ส่วนบุคคล 5 ปี', motoLicense: true,
        disabilityCard: false, militaryCert: false, other: '', isChecked: true, inspectorCode: 'EMP002'
      },
      interview: {
        interviewDate: '2025-10-22', result: 'ผ่าน', reason: 'บุคลิกภาพดี มีประสบการณ์ตรง',
        employmentType: 'พนักงานประจำ', wageRate: '18,000.00', company: 'บริษัท สปีดี้ แพคเก็จ เอ็กซ์เพรส จำกัด (สำนักงานใหญ่)',
        site: 'ธนาคารกสิกรไทย (งาน OFFICE) สำนักงานใหญ่', startDate: '2025-11-01', position: 'เจ้าหน้าที่ฝ่ายปฏิบัติการ',
        probationDays: 119, probationStart: '2025-11-01', probationEnd: '2026-02-27',
        comment: 'พร้อมเริ่มงานทันที', interviewer: 'นายพิชัย รักงาน', interviewerPos: 'ธุรการฝ่ายบุคคล',
        evalDate: '2025-10-22', evalResult: 'ผ่าน', bank: 'ธนาคาร กสิกรไทย จำกัด (มหาชน)', bankAccount: '012-3-45678-9'
      },
      guarantee: {
        contractNo: 'GUA-2568-001', contractDate: '2025-10-28', guarantorName: 'นายสมศักดิ์ ใจดี',
        guarantorAge: '55', guarantorIdCard: '3100800112233', guarantorHouseNo: '88/12', guarantorMoo: '4',
        guarantorRoad: 'สุขุมวิท', guarantorSubdistrict: 'บางนา', guarantorDistrict: 'บางนา',
        guarantorProvince: 'กรุงเทพมหานคร', guarantorPhone: '081-999-0001'
      }
    },
    {
      appId: 'APP-2568-002', applyDate: '2025-10-21', position: 'เจ้าหน้าที่ฝ่ายไอที', expectedSalary: '25,000.00',
      fullNameTh: 'นายธนภัทร ศรีสมบัติ', fullNameEn: 'Mr. Thanaphat Srisombat', idCard: '1100500887766',
      idIssueDate: '2021-03-12', idExpiryDate: '2030-03-11', houseNo: '12/5', moo: '1', road: 'พหลโยธิน',
      subdistrict: 'จตุจักร', district: 'จตุจักร', province: 'กรุงเทพมหานคร', homePhone: '-',
      mobilePhone: '085-777-8899', birthDate: '1997-08-20', weight: '68.00', height: '175.00',
      race: 'ไทย', nationality: 'ไทย', religion: 'พุทธ',
      fatherName: 'นายวิชัย ศรีสมบัติ', fatherJob: 'พนักงานบริษัท', motherName: 'นางรัตนา ศรีสมบัติ', motherJob: 'ค้าขาย',
      siblingsCount: 1, birthOrder: 1, livingWith: 'พักอาศัยเอง', residencePhone: '-',
      maritalStatus: 'โสด', spouseName: '', spousePhone: '', childrenCount: 0, isPregnant: false, pregnantMonths: 0,
      militaryStatus: 'จบ ร.ด.',
      eduLevel: 'ปริญญาตรี', institute: 'มหาวิทยาลัยเทคโนโลยีราชมงคล', eduProvince: 'กรุงเทพมหานคร', gpa: '3.40',
      major: 'เทคโนโลยีสารสนเทศ', gradYear: '2563', language: 'ภาษาอังกฤษ', langLevel: 'ดีมาก',
      typingTh: '40.00', typingEn: '55.00', compWord: true, compExcel: true, compPowerpoint: true,
      hasLicense: true, hasMotoLicense: false, hasCarLicense: true, licenseType: 'ส่วนบุคคล 5 ปี',
      licenseIssueDate: '2021-09-01', licenseExpiryDate: '2026-08-31',
      lastCompany: 'บริษัท ซอฟต์แวร์ โซลูชั่น จำกัด', lastPosition: 'IT Support', lastSalary: '22,000.00',
      lastDuration: '3', leaveReason: 'ย้ายที่พักอาศัย',
      emergencyName: 'นายวิชัย ศรีสมบัติ', emergencyRelation: 'บิดา', emergencyPhone: '089-444-5566',
      jobSource: 'JobThai', hasCriminalRecord: false, criminalDetail: '', pdpaConsent: true,
      status: 'สัมภาษณ์แล้ว',
      docCheck: {
        checkId: 'CHK-002', checkDate: '2025-10-21', photo: true, idCard: true, houseReg: true,
        education: true, carLicense: true, licenseType: 'ส่วนบุคคล 5 ปี', motoLicense: false,
        disabilityCard: false, militaryCert: true, other: '', isChecked: true, inspectorCode: 'EMP002'
      },
      interview: {
        interviewDate: '2025-10-23', result: 'รอการพิจารณา', reason: 'รอหัวหน้าแผนกไอทีสัมภาษณ์รอบ 2',
        employmentType: 'พนักงานประจำ', wageRate: '24,000.00', company: 'บริษัท พินนาเคิล ซอร์ส จำกัด (สำนักงานใหญ่)',
        site: 'บริษัท วิทยุการบินแห่งประเทศไทย จำกัด', startDate: '2025-11-15', position: 'เจ้าหน้าที่ฝ่ายไอที',
        probationDays: 119, probationStart: '2025-11-15', probationEnd: '2026-03-13',
        comment: 'ทักษะการแก้ปัญหาดีเยี่ยม', interviewer: 'นายพิชัย รักงาน', interviewerPos: 'ธุรการฝ่ายบุคคล',
        evalDate: '2025-10-23', evalResult: 'ผ่าน', bank: 'ธนาคาร กรุงไทย จำกัด (มหาชน)', bankAccount: '987-6-54321-0'
      },
      guarantee: {
        contractNo: '', contractDate: '', guarantorName: '', guarantorAge: '', guarantorIdCard: '',
        guarantorHouseNo: '', guarantorMoo: '', guarantorRoad: '', guarantorSubdistrict: '',
        guarantorDistrict: '', guarantorProvince: '', guarantorPhone: ''
      }
    }
  ]);

  const [selectedAppId, setSelectedAppId] = useState('APP-2568-001');
  const currentApplicant = useMemo(
    () => applicants.find((a) => a.appId === selectedAppId) || applicants[0],
    [applicants, selectedAppId]
  );

  // Blank Application Form State
  const blankAppForm = {
    applyDate: new Date().toISOString().split('T')[0], position: STAFF_POSITIONS[12], expectedSalary: '18,000.00',
    fullNameTh: '', fullNameEn: '', idCard: '', idIssueDate: '', idExpiryDate: '',
    houseNo: '', moo: '', road: '', subdistrict: '', district: '', province: 'กรุงเทพมหานคร',
    homePhone: '', mobilePhone: '', birthDate: '', weight: '0.00', height: '0.00',
    race: 'ไทย', nationality: 'ไทย', religion: 'พุทธ',
    fatherName: '', fatherJob: '', motherName: '', motherJob: '',
    siblingsCount: 0, birthOrder: 1, livingWith: '', residencePhone: '',
    maritalStatus: 'โสด', spouseName: '', spousePhone: '', childrenCount: 0, isPregnant: false, pregnantMonths: 0,
    militaryStatus: 'ได้รับการยกเว้น',
    eduLevel: 'ปริญญาตรี', institute: '', eduProvince: 'กรุงเทพมหานคร', gpa: '0.00',
    major: '', gradYear: '', language: 'ภาษาอังกฤษ', langLevel: 'พอใช้',
    typingTh: '0.00', typingEn: '0.00', compWord: false, compExcel: false, compPowerpoint: false,
    hasLicense: false, hasMotoLicense: false, hasCarLicense: false, licenseType: 'ส่วนบุคคล 5 ปี',
    licenseIssueDate: '', licenseExpiryDate: '',
    lastCompany: '', lastPosition: '', lastSalary: '0.00', lastDuration: '', leaveReason: '',
    emergencyName: '', emergencyRelation: '', emergencyPhone: '',
    jobSource: '', hasCriminalRecord: false, criminalDetail: '', pdpaConsent: true
  };
  const [newAppForm, setNewAppForm] = useState(blankAppForm);

  // Attachment Parameter Filter State (แทน Enter Parameter Value ของ Access)
  const [paramApplyDate, setParamApplyDate] = useState('');
  const [paramInterviewDate, setParamInterviewDate] = useState('');

  const filteredAttachmentApplicants = useMemo(() => {
    return applicants.filter((a) => {
      const matchApply = paramApplyDate ? a.applyDate === paramApplyDate : true;
      const matchInterview = paramInterviewDate ? a.interview?.interviewDate === paramInterviewDate : true;
      return matchApply && matchInterview;
    });
  }, [applicants, paramApplyDate, paramInterviewDate]);

  // Status Filter State
  const [statusSearch, setStatusSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // --- Handlers ---
  const handleSaveCompany = (e) => {
    e.preventDefault();
    setMainCompanies((prev) => {
      const exists = prev.some((c) => c.id === companyForm.id);
      return exists ? prev.map((c) => (c.id === companyForm.id ? companyForm : c)) : [...prev, companyForm];
    });
    showToast('บันทึกข้อมูลบริษัทหลักเรียบร้อยแล้ว');
  };

  const handleAddAffiliateContact = () => {
    if (!newContact.name) return showToast('กรุณากรอกชื่อผู้ติดต่อ', 'error');
    setAffiliates((prev) =>
      prev.map((aff) =>
        aff.id === affiliateForm.id
          ? { ...aff, contacts: [...aff.contacts, { ...newContact, id: Date.now() }] }
          : aff
      )
    );
    setAffiliateForm((prev) => ({
      ...prev,
      contacts: [...prev.contacts, { ...newContact, id: Date.now() }]
    }));
    setNewContact({ name: '', dept: '', phone: '', email: '', note: '' });
    showToast('เพิ่มรายชื่อผู้ติดต่อแล้ว');
  };

  const handleSaveAffiliate = (e) => {
    e.preventDefault();
    setAffiliates((prev) => {
      const exists = prev.some((a) => a.id === affiliateForm.id);
      return exists ? prev.map((a) => (a.id === affiliateForm.id ? affiliateForm : a)) : [...prev, affiliateForm];
    });
    showToast('บันทึกข้อมูลหน่วยงานลูกค้าในเครือเรียบร้อยแล้ว');
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setStaffForm((prev) => ({ ...prev, photo: url }));
    }
  };

  const handleSaveStaff = (e) => {
    e.preventDefault();
    setStaffList((prev) => {
      const exists = prev.some((s) => s.code === staffForm.code);
      return exists ? prev.map((s) => (s.code === staffForm.code ? staffForm : s)) : [...prev, staffForm];
    });
    showToast('บันทึกแบบฟอร์มข้อมูลพนักงานเรียบร้อยแล้ว');
  };

  const handleCreateApplication = (e) => {
    e.preventDefault();
    if (!newAppForm.fullNameTh) return showToast('กรุณากรอกคำนำหน้า-ชื่อ-สกุล (ไทย)', 'error');
    const newId = `APP-2568-00${applicants.length + 1}`;
    const created = {
      ...newAppForm,
      appId: newId,
      status: 'รอพิจารณา',
      docCheck: {
        checkId: `CHK-00${applicants.length + 1}`, checkDate: new Date().toISOString().split('T')[0],
        photo: false, idCard: false, houseReg: false, education: false, carLicense: newAppForm.hasCarLicense,
        licenseType: newAppForm.licenseType, motoLicense: newAppForm.hasMotoLicense, disabilityCard: false,
        militaryCert: false, other: '', isChecked: false, inspectorCode: staffList[0]?.code || 'EMP001'
      },
      interview: {
        interviewDate: '', result: 'รอการพิจารณา', reason: '', employmentType: 'พนักงานประจำ',
        wageRate: newAppForm.expectedSalary, company: mainCompanies[0]?.nameTh || '', site: AFFILIATE_SITES[0],
        startDate: '', position: newAppForm.position, probationDays: 119, probationStart: '', probationEnd: '',
        comment: '', interviewer: '', interviewerPos: '', evalDate: '', evalResult: 'ผ่าน',
        bank: BANKS[0], bankAccount: ''
      },
      guarantee: {
        contractNo: '', contractDate: '', guarantorName: '', guarantorAge: '', guarantorIdCard: '',
        guarantorHouseNo: '', guarantorMoo: '', guarantorRoad: '', guarantorSubdistrict: '',
        guarantorDistrict: '', guarantorProvince: '', guarantorPhone: ''
      }
    };
    setApplicants((prev) => [created, ...prev]);
    setSelectedAppId(newId);
    setNewAppForm(blankAppForm);
    showToast(`บันทึกใบสมัครงานเลขที่ ${newId} สำเร็จ`);
  };

  const updateCurrentApplicantSection = (section, data) => {
    setApplicants((prev) =>
      prev.map((a) => (a.appId === currentApplicant.appId ? { ...a, [section]: { ...a[section], ...data } } : a))
    );
  };

  // --- Helper สำหรับนำทางด่วนจากหน้าหลัก ---
  const navigateTo = (menu, subTab = null) => {
    setActiveMenu(menu);
    if (menu === 'master' && subTab) setMasterTab(subTab);
    if (menu === 'records' && subTab) setRecordSubTab(subTab);
    if (menu === 'attachments' && subTab) setAttachmentDoc(subTab);
  };

  return (
    <div className="min-h-screen flex bg-[#eef2f6] font-sans text-slate-800">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-xl shadow-xl text-white font-medium transition-all ${toast.type === 'error' ? 'bg-red-600' : 'bg-emerald-600'}`}>
          <CheckCircle2 className="w-5 h-5" />
          <span>{toast.msg}</span>
        </div>
      )}

      {/* ================= SIDEBAR (แนวทางตามภาพที่ 2: โทนน้ำเงินเข้ม + โลโก้ Speedy ด้านบน) ================= */}
      <aside className="w-64 bg-gradient-to-b from-[#0b438c] via-[#0d4ea1] to-[#083570] text-white flex flex-col justify-between shrink-0 relative overflow-hidden shadow-xl print:hidden">
        <div>
          {/* Logo Brand Header (พื้นหลังสีขาวด้านบนซ้ายตามภาพที่ 2) */}
          <div className="bg-white px-5 py-4 border-b border-slate-200 flex flex-col items-center justify-center shadow-sm">
            <div className="flex items-baseline gap-0.5 tracking-tight">
              <span className="text-3xl font-black italic text-[#f37021] drop-shadow-sm">SPEEDY</span>
            </div>
            <span className="text-[10px] font-extrabold tracking-widest text-[#16a34a] uppercase mt-0.5">
              PACKAGE EXPRESS
            </span>
          </div>

          {/* Menu Items */}
          <nav className="px-3 py-4 space-y-1.5 relative z-10">
            {[
              { id: 'dashboard', label: 'หน้าหลัก', icon: Home, hasArrow: false },
              { id: 'master', label: 'ฐานข้อมูล', icon: Building2, hasArrow: true },
              { id: 'records', label: 'บันทึกข้อมูล', icon: FileText, hasArrow: true },
              { id: 'attachments', label: 'เอกสารงาน HR', icon: FolderOpen, hasArrow: true },
              { id: 'reports', label: 'รายงาน', icon: BarChart3, hasArrow: true },
              { id: 'status', label: 'ตรวจสอบสถานะ', icon: CheckSquare, hasArrow: false },
              { id: 'settings', label: 'ตั้งค่าระบบ', icon: Settings, hasArrow: true }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#2b7de9] text-white shadow-md border-l-4 border-[#f37021]'
                      : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.hasArrow && <ChevronRight className="w-4 h-4 opacity-70" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Graphic Illustration & Logout */}
        <div className="relative z-10">
          {/* กล่องพัสดุลายเส้นตกแต่งมุมซ้ายล่างตามภาพที่ 2 */}
          <div className="px-6 pb-2 opacity-20 pointer-events-none">
            <svg viewBox="0 0 160 110" className="w-36 h-24 stroke-white fill-none" strokeWidth="2.5">
              <polygon points="75,20 135,40 135,90 75,105 35,85 35,35" />
              <polyline points="35,35 75,52 135,40" />
              <line x1="75" y1="52" x2="75" y2="105" />
              <line x1="5" y1="55" x2="28" y2="55" />
              <line x1="12" y1="68" x2="28" y2="68" />
              <line x1="0" y1="80" x2="28" y2="80" />
            </svg>
          </div>

          <div className="p-3 border-t border-white/10">
            <button
              onClick={() => showToast('ออกจากระบบเรียบร้อยแล้ว')}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-blue-200 hover:text-white hover:bg-white/10 transition"
            >
              <LogOut className="w-5 h-5" />
              <span>ออกจากระบบ</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MAIN CONTENT AREA ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar (ตามภาพที่ 2: ชื่อโปรแกรม + ชื่อบริษัท + วันที่/เวลา + ผู้ดูแลระบบ) */}
        <header className="h-[73px] bg-gradient-to-r from-[#eef5fc] via-[#f5f9ff] to-[#e6f0fa] border-b border-slate-200 px-6 flex items-center justify-between shrink-0 shadow-xs print:hidden">
          <div className="flex items-center gap-4">
            <div className="h-10 w-1 bg-[#1e40af] rounded-full hidden sm:block"></div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-[#0f3878] leading-tight">
                โปรแกรมบริหารงานทรัพยากรบุคคล (HR Management System)
              </h1>
              <p className="text-xs md:text-sm font-medium text-[#1d5bb8]">
                บริษัท สปีดี้แพคเก็จ เอ็กซ์เพรส จำกัด
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* วันที่และเวลาปัจจุบัน */}
            <div className="hidden xl:flex items-center gap-2 bg-white/80 border border-blue-200/80 px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#0f3878] shadow-2xs">
              <Calendar className="w-4 h-4 text-[#1d5bb8]" />
              <span>วันพุธที่ 25 พฤศจิกายน 2569 เวลา 08:25 น.</span>
            </div>

            {/* โปรไฟล์ผู้ดูแลระบบ */}
            <div className="flex items-center gap-2.5 bg-white border border-slate-200 px-3 py-1.5 rounded-full shadow-2xs cursor-pointer hover:bg-slate-50">
              <div className="w-7 h-7 rounded-full bg-[#0f3878] text-white flex items-center justify-center text-xs font-bold">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-slate-700">ผู้ดูแลระบบ</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-5 md:p-6 overflow-y-auto space-y-5">
          {/* ==================== 1. DASHBOARD (ปรับใหม่ตามภาพที่ 2 เป๊ะ) ==================== */}
          {activeMenu === 'dashboard' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
              {/* พื้นที่หลักฝั่งซ้าย (9 คอลัมน์) */}
              <div className="xl:col-span-9 space-y-5">
                {/* หัวข้อต้อนรับด้านบน */}
                <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-2xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0f4c9c] flex items-center justify-center shrink-0 border border-blue-100">
                    <Users className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#0f3878]">ระบบบริหารงานบุคคล (HR)</h2>
                    <p className="text-sm text-slate-600">
                      ยินดีต้อนรับสู่ระบบบริหารงานทรัพยากรบุคคล บริษัท สปีดี้แพคเก็จ เอ็กซ์เพรส จำกัด
                    </p>
                  </div>
                </div>

                {/* แถวการ์ดสรุปตัวเลข 5 ใบ (ตามภาพที่ 2) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                  {/* 1. พนักงานทั้งหมด */}
                  <div className="bg-[#e8f2fe] border border-blue-200/80 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs">
                    <div className="w-11 h-11 rounded-full bg-[#1976d2] text-white flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-600">พนักงานทั้งหมด</p>
                      <p className="text-xl font-extrabold text-slate-900 mt-0.5">
                        128 <span className="text-xs font-normal text-slate-600">คน</span>
                      </p>
                    </div>
                  </div>

                  {/* 2. พนักงานใหม่ (เดือนนี้) */}
                  <div className="bg-[#e7f7ed] border border-emerald-200/80 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs">
                    <div className="w-11 h-11 rounded-full bg-[#2e9e5b] text-white flex items-center justify-center shrink-0">
                      <UserPlus className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-600">พนักงานใหม่ <span className="text-[10px]">(เดือนนี้)</span></p>
                      <p className="text-xl font-extrabold text-slate-900 mt-0.5">
                        3 <span className="text-xs font-normal text-slate-600">คน</span>
                      </p>
                    </div>
                  </div>

                  {/* 3. พ้นสภาพ (เดือนนี้) */}
                  <div className="bg-[#fdf0e6] border border-orange-200/80 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs">
                    <div className="w-11 h-11 rounded-full bg-[#f37021] text-white flex items-center justify-center shrink-0">
                      <LogOut className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-600">พ้นสภาพ <span className="text-[10px]">(เดือนนี้)</span></p>
                      <p className="text-xl font-extrabold text-slate-900 mt-0.5">
                        1 <span className="text-xs font-normal text-slate-600">คน</span>
                      </p>
                    </div>
                  </div>

                  {/* 4. วันลาพักรออนุมัติ */}
                  <div className="bg-[#efeffb] border border-indigo-200/80 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs">
                    <div className="w-11 h-11 rounded-full bg-[#4f46e5] text-white flex items-center justify-center shrink-0">
                      <CalendarClock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-600">วันลาพักรออนุมัติ</p>
                      <p className="text-xl font-extrabold text-slate-900 mt-0.5">
                        5 <span className="text-xs font-normal text-slate-600">รายการ</span>
                      </p>
                    </div>
                  </div>

                  {/* 5. วันเกิดเดือนนี้ */}
                  <div className="bg-[#fcebf1] border border-pink-200/80 rounded-xl p-3.5 flex items-center gap-3 shadow-2xs col-span-2 sm:col-span-1">
                    <div className="w-11 h-11 rounded-full bg-[#db2777] text-white flex items-center justify-center shrink-0">
                      <Cake className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-600">วันเกิดเดือนนี้</p>
                      <p className="text-xl font-extrabold text-slate-900 mt-0.5">
                        7 <span className="text-xs font-normal text-slate-600">คน</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* คอลัมน์เมนูหลัก 4 คอลัมน์ (ตามภาพที่ 2: ฐานข้อมูล / บันทึกข้อมูล / เอกสารงาน HR / รายงาน) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* คอลัมน์ 1: ฐานข้อมูล (Master Data) */}
                  <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col">
                    <div className="bg-gradient-to-r from-[#0e4d9c] to-[#1a67c7] text-white px-4 py-3 flex items-center gap-3">
                      <Building2 className="w-6 h-6 shrink-0 opacity-90" />
                      <div>
                        <h3 className="font-bold text-sm leading-tight">ฐานข้อมูล</h3>
                        <p className="text-[11px] text-blue-100">(Master Data)</p>
                      </div>
                    </div>
                    <div className="p-3 space-y-2.5 flex-1 bg-slate-50/50">
                      <button
                        onClick={() => navigateTo('master', 'company')}
                        className="w-full flex items-center gap-3 bg-white hover:bg-blue-50 text-slate-700 hover:text-[#0e4d9c] border border-slate-200 hover:border-blue-300 px-3.5 py-2.5 rounded-lg text-xs font-semibold shadow-2xs transition text-left"
                      >
                        <Building2 className="w-4 h-4 text-[#1976d2] shrink-0" />
                        <span>บริษัท/องค์กร</span>
                      </button>
                      <button
                        onClick={() => navigateTo('master', 'affiliate')}
                        className="w-full flex items-center gap-3 bg-white hover:bg-blue-50 text-slate-700 hover:text-[#0e4d9c] border border-slate-200 hover:border-blue-300 px-3.5 py-2.5 rounded-lg text-xs font-semibold shadow-2xs transition text-left"
                      >
                        <Network className="w-4 h-4 text-[#1976d2] shrink-0" />
                        <span>โครงสร้างองค์กร / ลูกค้าในเครือ</span>
                      </button>
                      <button
                        onClick={() => navigateTo('master', 'staff')}
                        className="w-full flex items-center gap-3 bg-white hover:bg-blue-50 text-slate-700 hover:text-[#0e4d9c] border border-slate-200 hover:border-blue-300 px-3.5 py-2.5 rounded-lg text-xs font-semibold shadow-2xs transition text-left"
                      >
                        <Users className="w-4 h-4 text-[#1976d2] shrink-0" />
                        <span>พนักงาน</span>
                      </button>
                    </div>
                  </div>

                  {/* คอลัมน์ 2: บันทึกข้อมูล (HR Transactions) */}
                  <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col">
                    <div className="bg-gradient-to-r from-[#0e4d9c] to-[#1a67c7] text-white px-4 py-3 flex items-center gap-3">
                      <FileText className="w-6 h-6 shrink-0 opacity-90" />
                      <div>
                        <h3 className="font-bold text-sm leading-tight">บันทึกข้อมูล</h3>
                        <p className="text-[11px] text-blue-100">(HR Transactions)</p>
                      </div>
                    </div>
                    <div className="p-3 space-y-2 flex-1 bg-slate-50/50">
                      {[
                        { id: 'docCheck', label: 'ตรวจเอกสารสมัครงาน', icon: ClipboardCheck },
                        { id: 'interview', label: 'สัมภาษณ์งาน', icon: UserCheck },
                        { id: 'background', label: 'มอบอำนาจ/ตรวจประวัติ', icon: ShieldCheck },
                        { id: 'referInterview', label: 'หนังสือส่งตัวเพื่อเข้าสัมภาษณ์', icon: Send },
                        { id: 'referWork', label: 'หนังสือส่งตัวเพื่อเข้าปฏิบัติงาน', icon: Briefcase },
                        { id: 'guarantee', label: 'สัญญาค้ำประกันบุคคลเข้าทำงาน', icon: FileSignature }
                      ].map((btn) => {
                        const Icon = btn.icon;
                        return (
                          <button
                            key={btn.id}
                            onClick={() => navigateTo('records', btn.id)}
                            className="w-full flex items-center gap-2.5 bg-white hover:bg-blue-50 text-slate-700 hover:text-[#0e4d9c] border border-slate-200 hover:border-blue-300 px-3 py-2 rounded-lg text-xs font-semibold shadow-2xs transition text-left"
                          >
                            <Icon className="w-4 h-4 text-[#1976d2] shrink-0" />
                            <span className="truncate">{btn.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* คอลัมน์ 3: เอกสารงาน HR (Documents) */}
                  <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col">
                    <div className="bg-gradient-to-r from-[#0e4d9c] to-[#1a67c7] text-white px-4 py-3 flex items-center gap-3">
                      <FolderOpen className="w-6 h-6 shrink-0 opacity-90" />
                      <div>
                        <h3 className="font-bold text-sm leading-tight">เอกสารงาน HR</h3>
                        <p className="text-[11px] text-blue-100">(Documents)</p>
                      </div>
                    </div>
                    <div className="p-3 space-y-2 flex-1 bg-slate-50/50">
                      {[
                        { id: 'appForm', label: 'ใบสมัครงาน' },
                        { id: 'attachedDocs', label: 'เอกสารแนบใบสมัคร' },
                        { id: 'consentCollect', label: 'หนังสือยินยอมให้รวบรวมข้อมูล' },
                        { id: 'employmentContract', label: 'สัญญาจ้างงาน' },
                        { id: 'probationLetter', label: 'หนังสือรับเข้าทดลองงาน' },
                        { id: 'pdpaMemo', label: 'บันทึกรักษาข้อมูลเป็นความลับ' },
                        { id: 'consentForm', label: 'หนังสือให้ความยินยอม' }
                      ].map((doc) => (
                        <button
                          key={doc.id}
                          onClick={() => navigateTo('attachments', doc.id)}
                          className="w-full flex items-center gap-2.5 bg-white hover:bg-blue-50 text-slate-700 hover:text-[#0e4d9c] border border-slate-200 hover:border-blue-300 px-3 py-2 rounded-lg text-xs font-semibold shadow-2xs transition text-left"
                        >
                          <FileText className="w-4 h-4 text-[#1976d2] shrink-0" />
                          <span className="truncate">{doc.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* คอลัมน์ 4: รายงาน (Reports) */}
                  <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col">
                    <div className="bg-gradient-to-r from-[#0e4d9c] to-[#1a67c7] text-white px-4 py-3 flex items-center gap-3">
                      <BarChart3 className="w-6 h-6 shrink-0 opacity-90" />
                      <div>
                        <h3 className="font-bold text-sm leading-tight">รายงาน</h3>
                        <p className="text-[11px] text-blue-100">(Reports)</p>
                      </div>
                    </div>
                    <div className="p-3 space-y-2.5 flex-1 bg-slate-50/50">
                      {[
                        'รายงานข้อมูลพนักงาน',
                        'รายงานการรับสมัคร',
                        'รายงานการทดลองงาน',
                        'รายงานสัญญาจ้างงาน',
                        'รายงานภาพรวม HR'
                      ].map((rep, idx) => (
                        <button
                          key={idx}
                          onClick={() => navigateTo('reports')}
                          className="w-full flex items-center gap-2.5 bg-white hover:bg-blue-50 text-slate-700 hover:text-[#0e4d9c] border border-slate-200 hover:border-blue-300 px-3 py-2.5 rounded-lg text-xs font-semibold shadow-2xs transition text-left"
                        >
                          <BarChart3 className="w-4 h-4 text-[#1976d2] shrink-0" />
                          <span className="truncate">{rep}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* แถบด้านขวา 3 คอลัมน์ (ตามภาพที่ 2: งานที่ต้องดำเนินการ + ทางลัด Quick Access) */}
              <div className="xl:col-span-3 space-y-5">
                {/* กล่องบน: งานที่ต้องดำเนินการ */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4">
                  <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
                    <Bell className="w-5 h-5 text-[#0f4c9c]" />
                    <h3 className="font-bold text-sm text-[#0f3878]">งานที่ต้องดำเนินการ</h3>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { label: 'เอกสารสมัครงานรอตรวจสอบ', count: 3, targetMenu: 'records', targetSub: 'docCheck' },
                      { label: 'นัดสัมภาษณ์งานวันนี้', count: 1, targetMenu: 'records', targetSub: 'interview' },
                      { label: 'ใบลารออนุมัติ', count: 5, targetMenu: 'status', targetSub: null },
                      { label: 'ทดลองงานใกล้ครบกำหนด', count: 2, targetMenu: 'attachments', targetSub: 'probationLetter' },
                      { label: 'สัญญาจ้างใกล้หมดอายุ', count: 4, targetMenu: 'attachments', targetSub: 'employmentContract' }
                    ].map((task, idx) => (
                      <button
                        key={idx}
                        onClick={() => navigateTo(task.targetMenu, task.targetSub)}
                        className="w-full flex items-center justify-between text-left py-1.5 px-2 rounded-lg hover:bg-slate-50 transition group"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-slate-400 text-xs">▷</span>
                          <span className="text-xs font-medium text-slate-700 group-hover:text-[#0e4d9c] truncate">
                            {task.label}
                          </span>
                        </div>
                        <span className="bg-[#ef4444] text-white text-[11px] font-bold px-2 py-0.5 rounded-md shrink-0">
                          {task.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* กล่องล่าง: ทางลัด (Quick Access) */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-4">
                  <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
                    <Sparkles className="w-5 h-5 text-[#0f4c9c]" />
                    <h3 className="font-bold text-sm text-[#0f3878]">ทางลัด (Quick Access)</h3>
                  </div>

                  <div className="space-y-3">
                    {/* ปุ่มใหญ่ด้านบน: เพิ่มพนักงานใหม่ */}
                    <button
                      onClick={() => navigateTo('master', 'staff')}
                      className="w-full bg-[#f4f8fd] hover:bg-blue-50 border border-blue-200 rounded-xl p-3.5 flex flex-col items-center justify-center gap-1.5 transition shadow-2xs group"
                    >
                      <div className="w-9 h-9 rounded-full bg-white text-[#1976d2] flex items-center justify-center shadow-2xs group-hover:scale-105 transition">
                        <UserPlus className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-[#0f3878]">เพิ่มพนักงานใหม่</span>
                    </button>

                    {/* ปุ่มคู่ด้านล่าง: สร้างใบสมัครงาน + ค้นหาพนักงาน */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => navigateTo('records', 'application')}
                        className="bg-[#f4f8fd] hover:bg-blue-50 border border-blue-200 rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 transition shadow-2xs text-center"
                      >
                        <FilePlus className="w-5 h-5 text-[#1976d2]" />
                        <span className="text-[11px] font-bold text-[#0f3878] leading-tight">สร้างใบสมัครงาน</span>
                      </button>
                      <button
                        onClick={() => navigateTo('status')}
                        className="bg-[#f4f8fd] hover:bg-blue-50 border border-blue-200 rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 transition shadow-2xs text-center"
                      >
                        <Search className="w-5 h-5 text-[#1976d2]" />
                        <span className="text-[11px] font-bold text-[#0f3878] leading-tight">ค้นหาพนักงาน</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== 2. ฐานข้อมูลหลัก (3 ฟอร์มตามดีไซน์ + ดรอปดาวน์ PDF) ==================== */}
          {activeMenu === 'master' && (
            <div className="space-y-5">
              {/* Top Sub-tabs */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-50 text-[#0e4d9c] rounded-xl">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">ฐานข้อมูลหลัก (Master Data)</h2>
                    <p className="text-xs text-slate-500">จัดการข้อมูลบริษัทหลัก ลูกค้าในเครือ และพนักงานบริษัท</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'company', label: '1. บริษัทหลัก' },
                    { id: 'affiliate', label: '2. ลูกค้าในเครือ' },
                    { id: 'staff', label: '3. พนักงานบริษัท' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setMasterTab(tab.id)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                        masterTab === tab.id
                          ? 'bg-[#0e4d9c] text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* ฟอร์ม 1: ข้อมูลบริษัทหลัก */}
              {masterTab === 'company' && (
                <form onSubmit={handleSaveCompany} className="space-y-5">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                    <div className="bg-[#0e4d9c] text-white px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 font-semibold text-sm">
                        <Building2 className="w-4 h-4" />
                        <span>ข้อมูลบริษัทหลัก</span>
                      </div>
                      <select
                        value={companyForm.id}
                        onChange={(e) => {
                          const found = mainCompanies.find((c) => c.id === e.target.value);
                          if (found) setCompanyForm(found);
                        }}
                        className="text-xs bg-white/15 text-white border border-white/30 rounded-lg px-3 py-1 focus:outline-none"
                      >
                        {mainCompanies.map((c) => (
                          <option key={c.id} value={c.id} className="text-slate-900">
                            {c.id} - {c.nameTh}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">ID Company</label>
                        <input
                          type="text"
                          value={companyForm.id}
                          onChange={(e) => setCompanyForm({ ...companyForm, id: e.target.value })}
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">รหัสบริษัท *</label>
                        <input
                          type="text"
                          value={companyForm.code}
                          onChange={(e) => setCompanyForm({ ...companyForm, code: e.target.value })}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">ชื่อบริษัท TH *</label>
                        <input
                          type="text"
                          value={companyForm.nameTh}
                          onChange={(e) => setCompanyForm({ ...companyForm, nameTh: e.target.value })}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">ชื่อบริษัท ENG</label>
                        <input
                          type="text"
                          value={companyForm.nameEn}
                          onChange={(e) => setCompanyForm({ ...companyForm, nameEn: e.target.value })}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Header</label>
                        <input
                          type="text"
                          value={companyForm.header}
                          onChange={(e) => setCompanyForm({ ...companyForm, header: e.target.value })}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Footer</label>
                        <input
                          type="text"
                          value={companyForm.footer}
                          onChange={(e) => setCompanyForm({ ...companyForm, footer: e.target.value })}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                    <div className="bg-[#0e4d9c] text-white px-5 py-3 flex items-center gap-2 font-semibold text-sm">
                      <PhoneCall className="w-4 h-4" />
                      <span>ที่อยู่และการติดต่อ</span>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">เลขประจำตัวผู้เสียภาษี</label>
                        <input
                          type="text"
                          value={companyForm.taxId}
                          onChange={(e) => setCompanyForm({ ...companyForm, taxId: e.target.value })}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">โทรศัพท์ *</label>
                        <input
                          type="text"
                          value={companyForm.phone}
                          onChange={(e) => setCompanyForm({ ...companyForm, phone: e.target.value })}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-slate-600 mb-1">ที่อยู่ *</label>
                        <textarea
                          rows={2}
                          value={companyForm.address}
                          onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">โทรสาร</label>
                        <input
                          type="text"
                          value={companyForm.fax}
                          onChange={(e) => setCompanyForm({ ...companyForm, fax: e.target.value })}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">อีเมล</label>
                        <input
                          type="email"
                          value={companyForm.email}
                          onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-3">
                    <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-[#0e4d9c] hover:bg-blue-800 text-white rounded-xl text-sm font-semibold shadow-sm">
                      <Save className="w-4 h-4" /> บันทึก
                    </button>
                    <button
                      type="button"
                      onClick={() => setCompanyForm({ id: `COMP00${mainCompanies.length + 1}`, code: '', nameTh: '', nameEn: '', header: '', footer: '', taxId: '', address: '', phone: '', fax: '', email: '' })}
                      className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-sm font-semibold"
                    >
                      <Plus className="w-4 h-4" /> เพิ่มบริษัทใหม่
                    </button>
                  </div>
                </form>
              )}

              {/* ฟอร์ม 2: ข้อมูลหน่วยงานลูกค้าในเครือ */}
              {masterTab === 'affiliate' && (
                <form onSubmit={handleSaveAffiliate} className="space-y-5">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                    <div className="bg-[#0e4d9c] text-white px-5 py-3 flex items-center gap-2 font-semibold text-sm">
                      <Building2 className="w-4 h-4" />
                      <span>รายละเอียดหน่วยงานลูกค้าในเครือ</span>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">ID Customer</label>
                        <input
                          type="text"
                          value={affiliateForm.id}
                          onChange={(e) => setAffiliateForm({ ...affiliateForm, id: e.target.value })}
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">สถานะ * (ตาม PDF)</label>
                        <select
                          value={affiliateForm.status}
                          onChange={(e) => setAffiliateForm({ ...affiliateForm, status: e.target.value })}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm bg-white"
                        >
                          {CLIENT_STATUS_OPTIONS.map((st) => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">ภายใต้บริษัท * (ตาม PDF)</label>
                        <select
                          value={affiliateForm.underCompany}
                          onChange={(e) => setAffiliateForm({ ...affiliateForm, underCompany: e.target.value })}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm bg-white"
                        >
                          {mainCompanies.map((c) => (
                            <option key={c.id} value={c.nameTh}>{c.nameTh}</option>
                          ))}
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-slate-600 mb-1">ชื่อหน่วยงาน *</label>
                        <input
                          type="text"
                          value={affiliateForm.name}
                          onChange={(e) => setAffiliateForm({ ...affiliateForm, name: e.target.value })}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">ชื่องาน</label>
                        <input
                          type="text"
                          value={affiliateForm.jobName}
                          onChange={(e) => setAffiliateForm({ ...affiliateForm, jobName: e.target.value })}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-xs font-semibold text-slate-600 mb-1">ที่อยู่หน่วยงาน</label>
                        <input
                          type="text"
                          value={affiliateForm.address}
                          onChange={(e) => setAffiliateForm({ ...affiliateForm, address: e.target.value })}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">โทรศัพท์หน่วยงาน</label>
                        <input
                          type="text"
                          value={affiliateForm.phone}
                          onChange={(e) => setAffiliateForm({ ...affiliateForm, phone: e.target.value })}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">อีเมลหน่วยงาน</label>
                        <input
                          type="email"
                          value={affiliateForm.email}
                          onChange={(e) => setAffiliateForm({ ...affiliateForm, email: e.target.value })}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">วันเริ่มงาน</label>
                          <input
                            type="date"
                            value={affiliateForm.startDate}
                            onChange={(e) => setAffiliateForm({ ...affiliateForm, startDate: e.target.value })}
                            className="w-full px-2.5 py-2 border border-slate-200 rounded-lg text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">วันสิ้นสุดงาน</label>
                          <input
                            type="date"
                            value={affiliateForm.endDate}
                            onChange={(e) => setAffiliateForm({ ...affiliateForm, endDate: e.target.value })}
                            className="w-full px-2.5 py-2 border border-slate-200 rounded-lg text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">มูลค่าของงาน (บาท)</label>
                        <input
                          type="text"
                          value={affiliateForm.value}
                          onChange={(e) => setAffiliateForm({ ...affiliateForm, value: e.target.value })}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm text-right"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">ค่าปรับต่อวัน (บาท)</label>
                        <input
                          type="text"
                          value={affiliateForm.penalty}
                          onChange={(e) => setAffiliateForm({ ...affiliateForm, penalty: e.target.value })}
                          className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm text-right"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">จำนวนพนักงาน (คน)</label>
                          <input
                            type="number"
                            value={affiliateForm.staffCount}
                            onChange={(e) => setAffiliateForm({ ...affiliateForm, staffCount: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">พนักงานสำรอง (คน)</label>
                          <input
                            type="number"
                            value={affiliateForm.reserveCount}
                            onChange={(e) => setAffiliateForm({ ...affiliateForm, reserveCount: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* รายชื่อผู้ติดต่อ */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                    <div className="bg-[#0e4d9c] text-white px-5 py-3 flex items-center justify-between">
                      <span className="font-semibold text-sm">รายชื่อผู้ติดต่อ</span>
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                        <input
                          type="text"
                          placeholder="ชื่อผู้ติดต่อ"
                          value={newContact.name}
                          onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                          className="px-3 py-2 border border-slate-200 rounded-lg text-xs"
                        />
                        <input
                          type="text"
                          placeholder="ฝ่าย"
                          value={newContact.dept}
                          onChange={(e) => setNewContact({ ...newContact, dept: e.target.value })}
                          className="px-3 py-2 border border-slate-200 rounded-lg text-xs"
                        />
                        <input
                          type="text"
                          placeholder="เบอร์โทรติดต่อ"
                          value={newContact.phone}
                          onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                          className="px-3 py-2 border border-slate-200 rounded-lg text-xs"
                        />
                        <input
                          type="email"
                          placeholder="อีเมลผู้ติดต่อ"
                          value={newContact.email}
                          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                          className="px-3 py-2 border border-slate-200 rounded-lg text-xs"
                        />
                        <button
                          type="button"
                          onClick={handleAddAffiliateContact}
                          className="bg-[#f37021] hover:bg-orange-600 text-white rounded-lg text-xs font-semibold py-2 px-3 flex items-center justify-center gap-1"
                        >
                          <Plus className="w-4 h-4" /> เพิ่มผู้ติดต่อ
                        </button>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                          <thead className="bg-slate-50 text-slate-600 border-b">
                            <tr>
                              <th className="py-2.5 px-3">ชื่อผู้ติดต่อ</th>
                              <th className="py-2.5 px-3">ฝ่าย</th>
                              <th className="py-2.5 px-3">เบอร์โทรติดต่อ</th>
                              <th className="py-2.5 px-3">อีเมลผู้ติดต่อ</th>
                              <th className="py-2.5 px-3 text-center">ลบ</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {affiliateForm.contacts.map((ct) => (
                              <tr key={ct.id}>
                                <td className="py-2.5 px-3 font-medium">{ct.name}</td>
                                <td className="py-2.5 px-3">{ct.dept}</td>
                                <td className="py-2.5 px-3">{ct.phone}</td>
                                <td className="py-2.5 px-3">{ct.email}</td>
                                <td className="py-2.5 px-3 text-center">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setAffiliateForm((prev) => ({
                                        ...prev,
                                        contacts: prev.contacts.filter((x) => x.id !== ct.id)
                                      }))
                                    }
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 className="w-4 h-4 inline" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-3">
                    <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-[#0e4d9c] hover:bg-blue-800 text-white rounded-xl text-sm font-semibold">
                      <Save className="w-4 h-4" /> บันทึกข้อมูลลูกค้าในเครือ
                    </button>
                  </div>
                </form>
              )}

              {/* ฟอร์ม 3: แบบฟอร์มข้อมูลพนักงาน (Staff) */}
              {masterTab === 'staff' && (
                <form onSubmit={handleSaveStaff} className="space-y-5">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                    <div className="bg-[#0e4d9c] text-white px-5 py-3 flex items-center justify-between">
                      <span className="font-semibold text-sm">ข้อมูลส่วนตัวพนักงาน</span>
                      <select
                        value={staffForm.code}
                        onChange={(e) => {
                          const found = staffList.find((s) => s.code === e.target.value);
                          if (found) setStaffForm(found);
                        }}
                        className="text-xs bg-white/15 text-white border border-white/30 rounded-lg px-3 py-1"
                      >
                        {staffList.map((s) => (
                          <option key={s.code} value={s.code} className="text-slate-900">
                            {s.code} - {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-5">
                      {/* อัปโหลดรูปพนักงาน */}
                      <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-4 bg-slate-50">
                        {staffForm.photo ? (
                          <img src={staffForm.photo} alt="Staff" className="w-24 h-28 object-cover rounded-lg mb-2 shadow" />
                        ) : (
                          <div className="w-24 h-28 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 mb-2">
                            <Users className="w-10 h-10" />
                          </div>
                        )}
                        <label className="cursor-pointer bg-[#0e4d9c] text-white text-xs px-3 py-1.5 rounded-lg hover:bg-blue-800 flex items-center gap-1">
                          <Upload className="w-3.5 h-3.5" /> อัปโหลดรูปภาพ
                          <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                        </label>
                      </div>

                      <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">รหัสพนักงาน *</label>
                          <input
                            type="text"
                            value={staffForm.code}
                            onChange={(e) => setStaffForm({ ...staffForm, code: e.target.value })}
                            className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">ชื่อพนักงาน *</label>
                          <input
                            type="text"
                            value={staffForm.name}
                            onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                            className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">ตำแหน่งงาน * (14 ตำแหน่งตาม PDF)</label>
                          <select
                            value={staffForm.position}
                            onChange={(e) => setStaffForm({ ...staffForm, position: e.target.value })}
                            className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm bg-white"
                          >
                            {STAFF_POSITIONS.map((pos) => (
                              <option key={pos} value={pos}>{pos}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">ประจำหน่วยงาน * (5 ฝ่ายตาม PDF)</label>
                          <select
                            value={staffForm.department}
                            onChange={(e) => setStaffForm({ ...staffForm, department: e.target.value })}
                            className="w-full px-3.5 py-2 border border-slate-200 rounded-lg text-sm bg-white"
                          >
                            {STAFF_DEPARTMENTS.map((dep) => (
                              <option key={dep} value={dep}>{dep}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ข้อมูลการทำงาน + ธนาคาร + ฉุกเฉิน */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                      <div className="bg-[#0e4d9c] text-white px-5 py-3 font-semibold text-sm">ข้อมูลการทำงาน</div>
                      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">หมายเลขบัตรประชาชน *</label>
                          <input
                            type="text"
                            maxLength={13}
                            value={staffForm.idCard}
                            onChange={(e) => setStaffForm({ ...staffForm, idCard: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">สถานะการทำงาน * (ตาม PDF)</label>
                          <select
                            value={staffForm.workStatus}
                            onChange={(e) => setStaffForm({ ...staffForm, workStatus: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white"
                          >
                            {STAFF_STATUSES.map((st) => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-slate-600 mb-1">ที่อยู่ (ติดต่อได้) *</label>
                          <input
                            type="text"
                            value={staffForm.address}
                            onChange={(e) => setStaffForm({ ...staffForm, address: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">หมายเลขโทรศัพท์ *</label>
                          <input
                            type="text"
                            value={staffForm.phone}
                            onChange={(e) => setStaffForm({ ...staffForm, phone: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">วันที่เข้างาน</label>
                          <input
                            type="date"
                            value={staffForm.startDate}
                            onChange={(e) => setStaffForm({ ...staffForm, startDate: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                        <div className="bg-[#0e4d9c] text-white px-5 py-3 font-semibold text-sm">ข้อมูลธนาคาร</div>
                        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div className="sm:col-span-2">
                            <label className="block text-xs font-semibold text-slate-600 mb-1">บัญชีธนาคาร (ตาม PDF)</label>
                            <select
                              value={staffForm.bank}
                              onChange={(e) => setStaffForm({ ...staffForm, bank: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white"
                            >
                              {BANKS.map((b) => (
                                <option key={b} value={b}>{b}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">ประเภทบัญชีธนาคาร</label>
                            <select
                              value={staffForm.accountType}
                              onChange={(e) => setStaffForm({ ...staffForm, accountType: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white"
                            >
                              {BANK_ACCOUNT_TYPES.map((t) => (
                                <option key={t} value={t}>{t}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">เลขบัญชีธนาคาร</label>
                            <input
                              type="text"
                              value={staffForm.accountNo}
                              onChange={(e) => setStaffForm({ ...staffForm, accountNo: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                        <div className="bg-[#0e4d9c] text-white px-5 py-3 font-semibold text-sm">ผู้ติดต่อฉุกเฉิน</div>
                        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">กรณีฉุกเฉินติดต่อ *</label>
                            <input
                              type="text"
                              value={staffForm.emergencyName}
                              onChange={(e) => setStaffForm({ ...staffForm, emergencyName: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">โทรศัพท์ฉุกเฉิน</label>
                            <input
                              type="text"
                              value={staffForm.emergencyPhone}
                              onChange={(e) => setStaffForm({ ...staffForm, emergencyPhone: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-3">
                    <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-[#0e4d9c] hover:bg-blue-800 text-white rounded-xl text-sm font-semibold">
                      <Save className="w-4 h-4" /> บันทึกข้อมูลพนักงาน
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* ==================== 3. บันทึกข้อมูล (ครบทั้ง 7 ฟอร์มย่อยตาม PDF) ==================== */}
          {activeMenu === 'records' && (
            <div className="space-y-5">
              {/* Sub-navigation bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-orange-50 text-[#f37021] rounded-xl">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">ระบบบันทึกข้อมูล HR (7 ขั้นตอนตาม Access)</h2>
                      <p className="text-xs text-slate-500">เลือกผู้สมัครงานเพื่อเชื่อมโยงข้อมูลไปยังแบบฟอร์มต่างๆ อัตโนมัติ</p>
                    </div>
                  </div>

                  {recordSubTab !== 'application' && (
                    <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3.5 py-2 rounded-xl">
                      <span className="text-xs font-bold text-[#0e4d9c]">ผู้สมัครที่เลือก:</span>
                      <select
                        value={selectedAppId}
                        onChange={(e) => setSelectedAppId(e.target.value)}
                        className="text-xs font-semibold bg-white border border-blue-200 rounded-lg px-2.5 py-1 text-slate-800"
                      >
                        {applicants.map((a) => (
                          <option key={a.appId} value={a.appId}>
                            {a.appId} | {a.fullNameTh} ({a.position})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* 7 Sub-tabs */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                  {[
                    { id: 'application', label: '1. ใบสมัครงาน' },
                    { id: 'docCheck', label: '2. ตรวจเอกสารสมัครงาน' },
                    { id: 'interview', label: '3. สัมภาษณ์งาน' },
                    { id: 'background', label: '4. มอบอำนาจและตรวจประวัติ' },
                    { id: 'referInterview', label: '5. หนังสือส่งตัวเข้าสัมภาษณ์' },
                    { id: 'referWork', label: '6. หนังสือส่งตัวเข้าปฏิบัติงาน' },
                    { id: 'guarantee', label: '7. สัญญาค้ำประกันบุคคลเข้าทำงาน' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setRecordSubTab(tab.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                        recordSubTab === tab.id
                          ? 'bg-[#f37021] text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3.1 ใบสมัครงาน (Application Form ฉบับเต็ม) */}
              {recordSubTab === 'application' && (
                <form onSubmit={handleCreateApplication} className="space-y-5">
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
                    <div className="border-b pb-3 flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-[#0e4d9c]">ใบสมัครงาน : Application Form</h3>
                        <p className="text-xs text-slate-500">โปรดกรอกข้อความในฟอร์มใบสมัครงานอย่างละเอียดและครบถ้วน</p>
                      </div>
                      <span className="text-xs font-bold bg-orange-100 text-[#f37021] px-3 py-1 rounded-full">
                        เลขที่ (Auto): APP-2568-00{applicants.length + 1}
                      </span>
                    </div>

                    {/* ส่วนที่ 1: ตำแหน่งและข้อมูลส่วนตัว */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">วันที่สมัคร *</label>
                        <input
                          type="date"
                          value={newAppForm.applyDate}
                          onChange={(e) => setNewAppForm({ ...newAppForm, applyDate: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-600 mb-1">ตำแหน่งงานที่สมัคร *</label>
                        <select
                          value={newAppForm.position}
                          onChange={(e) => setNewAppForm({ ...newAppForm, position: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white"
                        >
                          {STAFF_POSITIONS.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">เงินเดือนที่ต้องการ (บาท)</label>
                        <input
                          type="text"
                          value={newAppForm.expectedSalary}
                          onChange={(e) => setNewAppForm({ ...newAppForm, expectedSalary: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-right"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-600 mb-1">คำนำหน้า-ชื่อ-สกุล (ไทย) *</label>
                        <input
                          type="text"
                          required
                          placeholder="เช่น นายสมชาย รักชาติ"
                          value={newAppForm.fullNameTh}
                          onChange={(e) => setNewAppForm({ ...newAppForm, fullNameTh: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Title-Name-Lastname (ENG)</label>
                        <input
                          type="text"
                          placeholder="e.g. Mr. Somchai Rakchart"
                          value={newAppForm.fullNameEn}
                          onChange={(e) => setNewAppForm({ ...newAppForm, fullNameEn: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">เลขบัตรประชาชน (13 หลัก)</label>
                        <input
                          type="text"
                          maxLength={13}
                          value={newAppForm.idCard}
                          onChange={(e) => setNewAppForm({ ...newAppForm, idCard: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">โทรศัพท์มือถือ *</label>
                        <input
                          type="text"
                          value={newAppForm.mobilePhone}
                          onChange={(e) => setNewAppForm({ ...newAppForm, mobilePhone: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">วันเกิด</label>
                        <input
                          type="date"
                          value={newAppForm.birthDate}
                          onChange={(e) => setNewAppForm({ ...newAppForm, birthDate: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">น้ำหนัก (กก.)</label>
                          <input
                            type="text"
                            value={newAppForm.weight}
                            onChange={(e) => setNewAppForm({ ...newAppForm, weight: e.target.value })}
                            className="w-full px-2.5 py-2 border border-slate-200 rounded-lg text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">ส่วนสูง (ซม.)</label>
                          <input
                            type="text"
                            value={newAppForm.height}
                            onChange={(e) => setNewAppForm({ ...newAppForm, height: e.target.value })}
                            className="w-full px-2.5 py-2 border border-slate-200 rounded-lg text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* ส่วนที่ 2: ครอบครัว & การศึกษา & ทักษะ */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                      <div className="space-y-3 bg-slate-50 p-4 rounded-xl">
                        <h4 className="text-xs font-bold text-[#0e4d9c] uppercase">ข้อมูลครอบครัวและสถานภาพ</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">สถานภาพ (ตาม PDF)</label>
                            <select
                              value={newAppForm.maritalStatus}
                              onChange={(e) => setNewAppForm({ ...newAppForm, maritalStatus: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
                            >
                              {MARITAL_STATUSES.map((m) => (
                                <option key={m} value={m}>{m}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">ราชการทหาร (ตาม PDF)</label>
                            <select
                              value={newAppForm.militaryStatus}
                              onChange={(e) => setNewAppForm({ ...newAppForm, militaryStatus: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
                            >
                              {MILITARY_STATUSES.map((m) => (
                                <option key={m} value={m}>{m}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">ชื่อบิดา</label>
                            <input
                              type="text"
                              value={newAppForm.fatherName}
                              onChange={(e) => setNewAppForm({ ...newAppForm, fatherName: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">ชื่อมารดา</label>
                            <input
                              type="text"
                              value={newAppForm.motherName}
                              onChange={(e) => setNewAppForm({ ...newAppForm, motherName: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 bg-slate-50 p-4 rounded-xl">
                        <h4 className="text-xs font-bold text-[#0e4d9c] uppercase">การศึกษาและความสามารถพิเศษ</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">ระดับการศึกษา (ตาม PDF)</label>
                            <select
                              value={newAppForm.eduLevel}
                              onChange={(e) => setNewAppForm({ ...newAppForm, eduLevel: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
                            >
                              {EDUCATION_LEVELS.map((ed) => (
                                <option key={ed} value={ed}>{ed}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">ชื่อสถานศึกษา (สุดท้าย)</label>
                            <input
                              type="text"
                              value={newAppForm.institute}
                              onChange={(e) => setNewAppForm({ ...newAppForm, institute: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">ความสามารถด้านภาษา</label>
                            <select
                              value={newAppForm.language}
                              onChange={(e) => setNewAppForm({ ...newAppForm, language: e.target.value })}
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
                            >
                              {LANGUAGES.map((l) => (
                                <option key={l} value={l}>{l}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">ระดับภาษา / ชนิดใบขับขี่</label>
                            <div className="grid grid-cols-2 gap-1.5">
                              <select
                                value={newAppForm.langLevel}
                                onChange={(e) => setNewAppForm({ ...newAppForm, langLevel: e.target.value })}
                                className="px-2 py-2 border border-slate-200 rounded-lg text-xs bg-white"
                              >
                                {LANGUAGE_LEVELS.map((lv) => (
                                  <option key={lv} value={lv}>{lv}</option>
                                ))}
                              </select>
                              <select
                                value={newAppForm.licenseType}
                                onChange={(e) => setNewAppForm({ ...newAppForm, licenseType: e.target.value })}
                                className="px-2 py-2 border border-slate-200 rounded-lg text-xs bg-white"
                              >
                                {DRIVER_LICENSE_TYPES.map((dl) => (
                                  <option key={dl} value={dl}>{dl}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setNewAppForm(blankAppForm)}
                        className="px-5 py-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        ล้างข้อมูล
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#0e4d9c] hover:bg-blue-800 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-sm"
                      >
                        <Save className="w-4 h-4" /> บันทึกใบสมัครงาน
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* 3.2 แบบตรวจสอบเอกสารประกอบการสมัครงาน */}
              {recordSubTab === 'docCheck' && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
                  <div className="flex flex-wrap items-center justify-between border-b pb-3 gap-2">
                    <h3 className="text-base font-bold text-[#0e4d9c]">แบบตรวจสอบเอกสารประกอบการสมัครงาน</h3>
                    <span className="text-xs font-semibold text-slate-500">
                      ผู้สมัคร: <strong className="text-slate-900">{currentApplicant.fullNameTh}</strong> | ตำแหน่ง: {currentApplicant.position}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { key: 'photo', label: '1. รูปถ่าย' },
                      { key: 'idCard', label: '2. บัตรประจำตัวประชาชน' },
                      { key: 'houseReg', label: '3. ทะเบียนบ้าน' },
                      { key: 'education', label: '4. วุฒิการศึกษา' },
                      { key: 'carLicense', label: '5. ใบขับขี่รถยนต์' },
                      { key: 'motoLicense', label: '6. ใบขับขี่มอเตอร์ไซค์' },
                      { key: 'disabilityCard', label: '7. บัตรคนพิการ' },
                      { key: 'militaryCert', label: '8. บัตรผ่านเกณฑ์ทหาร' }
                    ].map((doc) => (
                      <label
                        key={doc.key}
                        className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={!!currentApplicant.docCheck[doc.key]}
                            onChange={(e) => updateCurrentApplicantSection('docCheck', { [doc.key]: e.target.checked })}
                            className="w-4 h-4 accent-[#0e4d9c]"
                          />
                          <span className="text-sm font-medium text-slate-700">{doc.label}</span>
                        </div>
                        {doc.key === 'carLicense' && (
                          <select
                            value={currentApplicant.docCheck.licenseType}
                            onChange={(e) => updateCurrentApplicantSection('docCheck', { licenseType: e.target.value })}
                            className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white"
                          >
                            {DRIVER_LICENSE_TYPES.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        )}
                      </label>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t">
                    <div className="flex items-center gap-3">
                      <label className="text-xs font-bold text-slate-600">ผู้ตรวจเอกสาร (รหัสพนักงาน):</label>
                      <select
                        value={currentApplicant.docCheck.inspectorCode}
                        onChange={(e) => updateCurrentApplicantSection('docCheck', { inspectorCode: e.target.value })}
                        className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white"
                      >
                        {staffList.map((s) => (
                          <option key={s.code} value={s.code}>{s.code} - {s.name}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={() => showToast('บันทึกผลการตรวจเอกสารเรียบร้อยแล้ว')}
                      className="px-6 py-2.5 bg-[#0e4d9c] text-white rounded-xl text-sm font-semibold flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" /> บันทึกผลตรวจเอกสาร
                    </button>
                  </div>
                </div>
              )}

              {/* 3.3 แบบฟอร์มสัมภาษณ์งาน (INTERVIEW Form) */}
              {recordSubTab === 'interview' && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
                  <div className="border-b pb-3">
                    <h3 className="text-base font-bold text-[#0e4d9c]">แบบฟอร์มสัมภาษณ์งาน : INTERVIEW Form</h3>
                    <p className="text-xs text-slate-500">ผู้สมัคร: {currentApplicant.fullNameTh} ({currentApplicant.appId})</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">วันที่สัมภาษณ์</label>
                      <input
                        type="date"
                        value={currentApplicant.interview.interviewDate}
                        onChange={(e) => updateCurrentApplicantSection('interview', { interviewDate: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">ผลการสัมภาษณ์ (ตาม PDF)</label>
                      <select
                        value={currentApplicant.interview.result}
                        onChange={(e) => updateCurrentApplicantSection('interview', { result: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white"
                      >
                        {INTERVIEW_RESULTS.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">อัตราค่าจ้าง (บาท)</label>
                      <input
                        type="text"
                        value={currentApplicant.interview.wageRate}
                        onChange={(e) => updateCurrentApplicantSection('interview', { wageRate: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-right"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-xs font-semibold text-slate-600 mb-1">ภายใต้บริษัท / ชื่อหน่วยงาน (15 แห่งตาม PDF)</label>
                      <select
                        value={currentApplicant.interview.site}
                        onChange={(e) => updateCurrentApplicantSection('interview', { site: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white"
                      >
                        {AFFILIATE_SITES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">วันที่เริ่มงาน</label>
                      <input
                        type="date"
                        value={currentApplicant.interview.startDate}
                        onChange={(e) => updateCurrentApplicantSection('interview', { startDate: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">ผลการประเมินผู้สมัครงาน</label>
                      <select
                        value={currentApplicant.interview.evalResult}
                        onChange={(e) => updateCurrentApplicantSection('interview', { evalResult: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white"
                      >
                        {EVALUATION_RESULTS.map((ev) => (
                          <option key={ev} value={ev}>{ev}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">เลขบัญชีธนาคาร</label>
                      <input
                        type="text"
                        value={currentApplicant.interview.bankAccount}
                        onChange={(e) => updateCurrentApplicantSection('interview', { bankAccount: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label className="block text-xs font-semibold text-slate-600 mb-1">ความคิดเห็นผู้สัมภาษณ์</label>
                      <textarea
                        rows={2}
                        value={currentApplicant.interview.comment}
                        onChange={(e) => updateCurrentApplicantSection('interview', { comment: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => showToast('บันทึกข้อมูลการสัมภาษณ์เรียบร้อยแล้ว')}
                      className="px-6 py-2.5 bg-[#0e4d9c] text-white rounded-xl text-sm font-semibold flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" /> บันทึกผลสัมภาษณ์
                    </button>
                  </div>
                </div>
              )}

              {/* 3.4 - 3.7 แบบฟอร์มเอกสารราชการ/สัญญา */}
              {['background', 'referInterview', 'referWork', 'guarantee'].includes(recordSubTab) && (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-2xs space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h3 className="text-base font-bold text-[#0e4d9c]">
                        {recordSubTab === 'background' && '4. หนังสือมอบอำนาจและยินยอมตรวจประวัติอาชญากรรม'}
                        {recordSubTab === 'referInterview' && '5. หนังสือส่งตัวพนักงานเพื่อเข้าสัมภาษณ์'}
                        {recordSubTab === 'referWork' && '6. หนังสือส่งตัวพนักงานเพื่อเข้าปฏิบัติงาน'}
                        {recordSubTab === 'guarantee' && '7. สัญญาค้ำประกันบุคคลเข้าทำงาน'}
                      </h3>
                      <p className="text-xs text-slate-500">ดึงข้อมูลอัตโนมัติจากใบสมัครเลขที่ {currentApplicant.appId}</p>
                    </div>
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 bg-[#f37021] hover:bg-orange-600 text-white rounded-xl text-xs font-semibold flex items-center gap-2"
                    >
                      <Printer className="w-4 h-4" /> พิมพ์เอกสารฉบับนี้
                    </button>
                  </div>

                  <div className="max-w-3xl mx-auto p-8 border border-slate-300 rounded-xl bg-white space-y-4 text-sm leading-relaxed">
                    <div className="text-center font-bold text-base text-slate-900">
                      {companyForm.nameTh}
                      <p className="text-xs font-normal text-slate-500">{companyForm.address}</p>
                    </div>
                    <hr />
                    <p>
                      <strong>เรียน:</strong> ผู้จัดการฝ่ายบุคคล / หัวหน้าหน่วยงาน <strong>{currentApplicant.interview.site}</strong>
                    </p>
                    <p>
                      <strong>เรื่อง:</strong>{' '}
                      {recordSubTab === 'background' && 'ขอความอนุเคราะห์ตรวจสอบประวัติอาชญากรรมและข้อมูลส่วนบุคคล'}
                      {recordSubTab === 'referInterview' && 'ขอจัดส่งพนักงานเพื่อเข้าสัมภาษณ์งาน'}
                      {recordSubTab === 'referWork' && 'ขอจัดส่งพนักงานเพื่อเข้าปฏิบัติงานประจำหน่วยงาน'}
                      {recordSubTab === 'guarantee' && 'สัญญาค้ำประกันบุคคลเข้าทำงาน (ครบ 4 ข้อสัญญาตามระเบียบบริษัท)'}
                    </p>
                    <div className="bg-slate-50 p-4 rounded-lg space-y-1.5 text-xs">
                      <p><strong>ชื่อ-สกุล ผู้สมัคร/พนักงาน:</strong> {currentApplicant.fullNameTh}</p>
                      <p><strong>เลขประจำตัวประชาชน:</strong> {currentApplicant.idCard}</p>
                      <p><strong>ตำแหน่งงาน:</strong> {currentApplicant.position}</p>
                      <p><strong>วุฒิการศึกษา:</strong> {currentApplicant.eduLevel} ({currentApplicant.institute})</p>
                      <p><strong>เบอร์โทรศัพท์ติดต่อ:</strong> {currentApplicant.mobilePhone}</p>
                      <p><strong>วันที่เริ่มงาน:</strong> {currentApplicant.interview.startDate || '-'}</p>
                    </div>
                    <p className="text-xs text-slate-600 pt-2">
                      ข้าพเจ้าขอรับรองว่าข้อมูลทั้งหมดข้างต้นเป็นความจริงทุกประการ และยินยอมให้บริษัทดำเนินการตามขั้นตอนระเบียบข้อบังคับของบริษัททุกประการ
                    </p>
                    <div className="grid grid-cols-2 gap-8 pt-10 text-center text-xs">
                      <div>
                        <p>ลงชื่อ ...................................................... ผู้สมัคร/ผู้ค้ำประกัน</p>
                        <p className="mt-1">({currentApplicant.fullNameTh})</p>
                      </div>
                      <div>
                        <p>ลงชื่อ ...................................................... เจ้าหน้าที่ฝ่ายบุคคล</p>
                        <p className="mt-1">(บริษัท สปีดี้แพคเก็จ เอ็กซ์เพรส จำกัด)</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== 4. เอกสารงาน HR / เอกสารแนบท้ายใบสมัคร (7 ฉบับ) ==================== */}
          {activeMenu === 'attachments' && (
            <div className="space-y-5">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 print:hidden">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 text-[#0e4d9c] rounded-xl">
                      <FolderOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">เอกสารงาน HR (Documents 7 ฉบับ)</h2>
                      <p className="text-xs text-slate-500">ค้นหาตามวันที่สมัคร / วันที่สัมภาษณ์ และสั่งพิมพ์เอกสารแนบท้ายได้ทันที</p>
                    </div>
                  </div>

                  {/* Parameter Filter (แทน Enter Parameter Value ของ Access) */}
                  <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-slate-600">วันที่สมัคร:</span>
                      <input
                        type="date"
                        value={paramApplyDate}
                        onChange={(e) => setParamApplyDate(e.target.value)}
                        className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white"
                      />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-slate-600">วันที่สัมภาษณ์:</span>
                      <input
                        type="date"
                        value={paramInterviewDate}
                        onChange={(e) => setParamInterviewDate(e.target.value)}
                        className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white"
                      />
                    </div>
                    {(paramApplyDate || paramInterviewDate) && (
                      <button
                        onClick={() => {
                          setParamApplyDate('');
                          setParamInterviewDate('');
                        }}
                        className="text-xs text-red-600 font-semibold px-2"
                      >
                        ล้างตัวกรอง
                      </button>
                    )}
                  </div>
                </div>

                {/* เลือกผู้สมัครและประเภทเอกสารทั้ง 7 ฉบับ */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'appForm', label: '1. ใบสมัครงาน' },
                      { id: 'attachedDocs', label: '2. เอกสารแนบใบสมัคร' },
                      { id: 'consentCollect', label: '3. หนังสือยินยอมให้รวบรวมข้อมูล' },
                      { id: 'employmentContract', label: '4. สัญญาจ้างงาน' },
                      { id: 'probationLetter', label: '5. หนังสือรับเข้าทดลองงาน' },
                      { id: 'pdpaMemo', label: '6. บันทึกรักษาข้อมูลเป็นความลับ (PDPA)' },
                      { id: 'consentForm', label: '7. หนังสือให้ความยินยอม' }
                    ].map((d) => (
                      <button
                        key={d.id}
                        onClick={() => setAttachmentDoc(d.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                          attachmentDoc === d.id
                            ? 'bg-[#0e4d9c] text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={selectedAppId}
                      onChange={(e) => setSelectedAppId(e.target.value)}
                      className="text-xs font-semibold border border-slate-300 rounded-lg px-3 py-2 bg-white"
                    >
                      {filteredAttachmentApplicants.map((a) => (
                        <option key={a.appId} value={a.appId}>
                          {a.appId} - {a.fullNameTh}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 bg-[#f37021] hover:bg-orange-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Printer className="w-4 h-4" /> พิมพ์
                    </button>
                  </div>
                </div>
              </div>

              {/* A4 Document Preview */}
              <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-2xs max-w-4xl mx-auto">
                <div className="text-center border-b-2 border-slate-800 pb-4 mb-6">
                  <h2 className="text-xl font-bold text-slate-900">{companyForm.nameTh}</h2>
                  <p className="text-xs text-slate-600 mt-1">{companyForm.address} | โทร. {companyForm.phone}</p>
                  <div className="mt-3 inline-block bg-slate-900 text-white px-5 py-1.5 rounded-full text-sm font-bold">
                    {attachmentDoc === 'appForm' && 'แบบฟอร์มใบสมัครงาน (Application Form)'}
                    {attachmentDoc === 'attachedDocs' && 'รายการเอกสารแนบประกอบการสมัครงาน'}
                    {attachmentDoc === 'consentCollect' && 'หนังสือยินยอมให้เก็บรวบรวมและใช้เอกสารส่วนบุคคล'}
                    {attachmentDoc === 'employmentContract' && 'สัญญาจ้างงาน (Employment Contract)'}
                    {attachmentDoc === 'probationLetter' && 'หนังสือรับเข้าทดลองงาน (Probation Letter)'}
                    {attachmentDoc === 'pdpaMemo' && 'บันทึกรักษาข้อมูลเป็นความลับ (PDPA)'}
                    {attachmentDoc === 'consentForm' && 'หนังสือให้ความยินยอมในการตรวจสอบประวัติ'}
                  </div>
                </div>

                <div className="space-y-4 text-sm text-slate-800 leading-relaxed">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>เลขที่เอกสารอ้างอิง: <strong>{currentApplicant.appId}</strong></span>
                    <span>วันที่สมัคร: <strong>{currentApplicant.applyDate}</strong></span>
                  </div>
                  <p>
                    ข้าพเจ้า <strong>{currentApplicant.fullNameTh}</strong> ({currentApplicant.fullNameEn || '-'})
                    เลขประจำตัวประชาชน <strong>{currentApplicant.idCard}</strong> ปัจจุบันอยู่บ้านเลขที่ {currentApplicant.houseNo} หมู่ {currentApplicant.moo} ถนน{currentApplicant.road} แขวง/ตำบล{currentApplicant.subdistrict} เขต/อำเภอ{currentApplicant.district} จังหวัด{currentApplicant.province} เบอร์โทรศัพท์ <strong>{currentApplicant.mobilePhone}</strong>
                  </p>
                  <p>
                    ได้ตกลงเข้าปฏิบัติงานในตำแหน่ง <strong>{currentApplicant.position}</strong> ประจำหน่วยงาน <strong>{currentApplicant.interview.site}</strong>
                    อัตราค่าจ้าง <strong>{currentApplicant.interview.wageRate} บาท/เดือน</strong> เริ่มปฏิบัติงานตั้งแต่วันที่ <strong>{currentApplicant.interview.startDate || '....................'}</strong> โดยมีระยะเวลาทดลองงาน {currentApplicant.interview.probationDays} วัน
                  </p>
                  <p>
                    ข้าพเจ้าได้รับทราบและยินยอมปฏิบัติตามระเบียบข้อบังคับในการทำงาน นโยบายคุ้มครองข้อมูลส่วนบุคคล (PDPA) และการรักษาความลับของทางบริษัททุกประการ หากฝ่าฝืนยินยอมให้บริษัทดำเนินการตามกฎหมายและระเบียบของบริษัทได้ทันที
                  </p>

                  <div className="grid grid-cols-2 gap-10 pt-14 text-center text-xs">
                    <div>
                      <p>ลงชื่อ ............................................................ พนักงาน / ผู้สมัคร</p>
                      <p className="mt-1.5">({currentApplicant.fullNameTh})</p>
                      <p className="text-slate-400 mt-1">วันที่ ........../........../..........</p>
                    </div>
                    <div>
                      <p>ลงชื่อ ............................................................ ผู้มีอำนาจลงนาม</p>
                      <p className="mt-1.5">({companyForm.nameTh})</p>
                      <p className="text-slate-400 mt-1">วันที่ ........../........../..........</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== 5. ตรวจสอบสถานะใบสมัคร / ค้นหาพนักงาน ==================== */}
          {activeMenu === 'status' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-[#0f3878]">ตรวจสอบสถานะใบสมัครและรายชื่อบุคลากร</h2>
                  <p className="text-xs text-slate-500">ค้นหา คัดกรอง และปรับสถานะการพิจารณาใบสมัครงาน</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="ค้นหาชื่อ หรือตำแหน่ง..."
                      value={statusSearch}
                      onChange={(e) => setStatusSearch(e.target.value)}
                      className="pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs w-56"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-slate-200 rounded-xl text-xs bg-white"
                  >
                    <option value="ALL">ทุกสถานะ</option>
                    <option value="รอพิจารณา">รอพิจารณา</option>
                    <option value="สัมภาษณ์แล้ว">สัมภาษณ์แล้ว</option>
                    <option value="ผ่านการคัดเลือก">ผ่านการคัดเลือก</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600 text-xs border-b">
                    <tr>
                      <th className="py-3 px-4">เลขที่ใบสมัคร</th>
                      <th className="py-3 px-4">ชื่อ-นามสกุล</th>
                      <th className="py-3 px-4">ตำแหน่งงาน</th>
                      <th className="py-3 px-4">วันที่สมัคร</th>
                      <th className="py-3 px-4">สถานะ</th>
                      <th className="py-3 px-4 text-center">จัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {applicants
                      .filter((a) => {
                        const matchText =
                          a.fullNameTh.includes(statusSearch) ||
                          a.position.includes(statusSearch) ||
                          a.appId.includes(statusSearch);
                        const matchSt = statusFilter === 'ALL' ? true : a.status === statusFilter;
                        return matchText && matchSt;
                      })
                      .map((app) => (
                        <tr key={app.appId} className="hover:bg-slate-50/80">
                          <td className="py-3 px-4 font-semibold text-[#0e4d9c] text-xs">{app.appId}</td>
                          <td className="py-3 px-4 font-medium">{app.fullNameTh}</td>
                          <td className="py-3 px-4 text-slate-600 text-xs">{app.position}</td>
                          <td className="py-3 px-4 text-slate-500 text-xs">{app.applyDate}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                app.status === 'ผ่านการคัดเลือก'
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : app.status === 'สัมภาษณ์แล้ว'
                                  ? 'bg-orange-100 text-orange-700'
                                  : 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              {app.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => {
                                setSelectedAppId(app.appId);
                                setActiveMenu('records');
                                setRecordSubTab('interview');
                              }}
                              className="text-xs bg-blue-50 hover:bg-blue-100 text-[#0e4d9c] font-semibold px-3 py-1.5 rounded-lg"
                            >
                              ดูรายละเอียด / สัมภาษณ์
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================== 6. รายงาน (Reports) ==================== */}
          {activeMenu === 'reports' && (
            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-[#0f3878]">รายงานสรุปข้อมูลทรัพยากรบุคคล (HR Reports)</h2>
                    <p className="text-xs text-slate-500">สรุปภาพรวมจำนวนพนักงาน การรับสมัคร และสถานะการคัดเลือก</p>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-[#0e4d9c] text-white rounded-xl text-xs font-semibold flex items-center gap-2"
                  >
                    <Printer className="w-4 h-4" /> พิมพ์รายงาน
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                    <p className="text-xs font-semibold text-blue-700">จำนวนผู้สมัครทั้งหมด</p>
                    <p className="text-2xl font-extrabold text-slate-900 mt-1">128 คน</p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                    <p className="text-xs font-semibold text-emerald-700">ผ่านการคัดเลือก</p>
                    <p className="text-2xl font-extrabold text-slate-900 mt-1">48 คน</p>
                  </div>
                  <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
                    <p className="text-xs font-semibold text-orange-700">อยู่ระหว่างสัมภาษณ์</p>
                    <p className="text-2xl font-extrabold text-slate-900 mt-1">32 คน</p>
                  </div>
                  <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
                    <p className="text-xs font-semibold text-purple-700">ไม่ผ่านการคัดเลือก</p>
                    <p className="text-2xl font-extrabold text-slate-900 mt-1">48 คน</p>
                  </div>
                </div>

                {/* Bar Chart Summary */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                  <h3 className="text-sm font-bold text-slate-800 mb-4">สถิติพนักงานแยกตามฝ่ายงาน</h3>
                  <div className="space-y-3">
                    {[
                      { dept: 'ฝ่ายปฏิบัติการ', count: 68, pct: '75%', color: 'bg-[#1976d2]' },
                      { dept: 'ฝ่ายบัญชีและการเงิน', count: 22, pct: '40%', color: 'bg-[#f37021]' },
                      { dept: 'ฝ่ายบุคคลและธุรการ', count: 18, pct: '32%', color: 'bg-[#2e9e5b]' },
                      { dept: 'ฝ่ายขายและการตลาด', count: 20, pct: '36%', color: 'bg-[#4f46e5]' }
                    ].map((row, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>{row.dept}</span>
                          <span>{row.count} คน</span>
                        </div>
                        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                          <div className={`h-full ${row.color} rounded-full`} style={{ width: row.pct }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== 7. ตั้งค่าระบบ (Settings) ==================== */}
          {activeMenu === 'settings' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs max-w-2xl">
              <h2 className="text-lg font-bold text-[#0f3878] mb-2">ตั้งค่าระบบ (System Settings)</h2>
              <p className="text-xs text-slate-500 mb-4">กำหนดค่าเริ่มต้นของบริษัท สปีดี้แพคเก็จ เอ็กซ์เพรส จำกัด และการเชื่อมต่อฐานข้อมูล</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border">
                  <span className="font-medium">โหมดการแสดงผลวันที่</span>
                  <span className="text-xs font-bold text-[#0e4d9c] bg-blue-100 px-3 py-1 rounded-full">พุทธศักราช (พ.ศ.)</span>
                </div>
                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border">
                  <span className="font-medium">สถานะการเชื่อมต่อฐานข้อมูล</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">พร้อมใช้งาน (Local State)</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}