import {Injectable} from '@angular/core';

@Injectable()
export class ConstantvariablesService {

  constructor() {
  }

  getReligionList() {
    let religion = [
      {'id': 1, 'name': 'Islam'},
      {'id': 2, 'name': 'Katolik'},
      {'id': 3, 'name': 'Protestan'},
      {'id': 4, 'name': 'Hindu'},
      {'id': 5, 'name': 'Budha'},
      {'id': 6, 'name': 'Yahudi'},
      {'id': 7, 'name': 'Atheis'},
      {'id': 8, 'name': 'Kong Hu Chu'}
    ];
    return religion;
  }

  getGenderList() {
    let gender = [
      {'id': 1, 'name': 'Laki-Laki'},
      {'id': 2, 'name': 'Perempuan'}
    ];
    return gender;
  }

  getStatusServiceList() {
    let status = [
      {'id': 1, 'status': 'Active', 'value': true},
      {'id': 2, 'status': 'Non Active', 'value' : false}
    ];
    return status;
  }

  getStatusList() {
    let status = [
      {'id': 1, 'status': 'Active', 'value' : '1'},
      {'id': 2, 'status': 'Suspend', 'value' : '2'},
      {'id': 3, 'status': 'Pending', 'value' : '3'},
      {'id': 4, 'status': 'Non Active', 'value' : '4'}
    ];
    return status;
  }


  getPagesOption() {
    let opt = [
      {'id': 1, 'value': 10},
      {'id': 2, 'value': 15},
      {'id': 3, 'value': 20},
      {'id': 4, 'value': 25},
      {'id': 5, 'value': 30},
      {'id': 6, 'value': 35},
      {'id': 7, 'value': 40},
      {'id': 8, 'value': 45},
      {'id': 9, 'value': 50},
      {'id': 10, 'value': 100},
      {'id': 11, 'value': 200}
    ];
    return opt;
  }


  getSortType() {
    let sortType = [
      {'id': 1, 'name': 'A-Z', 'value': 'ASC'},
      {'id': 2, 'name': 'Z-A', 'value': 'DESC'},
    ];
    return sortType;
  }

  getDay() {
    let day = [
      {'id': 1, 'name': 'Minggu'},
      {'id': 2, 'name': 'Senin'},
      {'id': 3, 'name': 'Selasa'},
      {'id': 4, 'name': 'Rabu'},
      {'id': 5, 'name': 'Kamis'},
      {'id': 6, 'name': 'Jumat'},
      {'id': 7, 'name': 'Sabtu'}
    ];
    return day;
  }


  getPatientField() {
    let patientField = [
      {'id': 1, 'name': 'Patient Name', 'value': 'fullName'},
      {'id': 2, 'name': 'patient Id', 'value': 'id'},
      {'id': 3, 'name': 'Patient Code', 'value': 'patientCode'},
      {'id': 4, 'name': 'Phone Number', 'value': 'phoneNumber'},
      {'id': 5, 'name': 'Email', 'value': 'email'},
      {'id': 6, 'name': 'Device Code', 'value': 'deviceCode'}
    ];
    return patientField;
  }


  getPatientSortField() {
    let patientField = [
      {'id': 1, 'name': 'Patient Name', 'value': 'fullName'},
      {'id': 2, 'name': 'Patient Code', 'value': 'patientCode'},
      {'id': 3, 'name': 'Patient Id', 'value': 'id'}
    ];
    return patientField;
  }

  // =================

  getDoctorField() {
    let doctorField = [
      {'id': 1, 'name': 'Doctor Name', 'value': 'fullName'},
      {'id': 2, 'name': 'Doctor Id', 'value': 'id'},
      {'id': 3, 'name': 'Doctor Code', 'value': 'doctorCode'},
      {'id': 4, 'name': 'Phone Number', 'value': 'phoneNumber'},
      {'id': 5, 'name': 'Email', 'value': 'email'},
      {'id': 6, 'name': 'Register Number', 'value': 'registerNumber'}
    ];
    return doctorField;
  }

  getDoctorSortField() {
    let doctorField = [
      {'id': 1, 'name': 'Doctor Name', 'value': 'fullName'},
      {'id': 2, 'name': 'Doctor Code', 'value': 'doctorCode'},
      {'id': 3, 'name': 'Doctor Id', 'value': 'id'}
    ];
    return doctorField;
  }

  // =================

  getNurseField() {
    let nurseField = [
      {'id': 1, 'name': 'Nurse Name', 'value': 'fullName'},
      {'id': 2, 'name': 'Nurse Id', 'value': 'id'},
      {'id': 3, 'name': 'Nurse Code', 'value': 'nurseCode'},
      {'id': 4, 'name': 'Phone Number', 'value': 'phoneNumber'},
      {'id': 5, 'name': 'Email', 'value': 'email'},
      {'id': 6, 'name': 'SIPP', 'value': 'sipp'}
    ];
    return nurseField;
  }

  getNurseSortField() {
    let nurseField = [
      {'id': 1, 'name': 'Nurse Name', 'value': 'fullName'},
      {'id': 2, 'name': 'Nurse Code', 'value': 'nurseCode'},
      {'id': 3, 'name': 'Nurse Id', 'value': 'id'}
    ];
    return nurseField;
  }

  // =================

  getClinicField() {
    let clinicField = [
      {'id': 1, 'name': 'Name', 'value': 'fullName'},
      {'id': 2, 'name': 'User Id', 'value': 'id'},
      {'id': 3, 'name': 'User Code', 'value': 'userCode'},
      {'id': 4, 'name': 'Phone Number', 'value': 'phoneNumber'},
      {'id': 5, 'name': 'Email', 'value': 'email'}
    ];
    return clinicField;
  }

  getClinicSortField() {
    let clinicField = [
      {'id': 1, 'name': 'Name', 'value': 'fullName'},
      {'id': 2, 'name': 'User Code', 'value': 'userCode'},
      {'id': 3, 'name': 'User Id', 'value': 'id'}
    ];
    return clinicField;
  }

  // =================

  getEcgField() {
    let ecgField = [
      {'id': 1, 'name': 'Id', 'value': 'fullName'},
      {'id': 2, 'name': 'Order Analog', 'value': 'orderAnalog'},
    ];
    return ecgField;
  }

  getEcgSortField() {
    let ecgField = [
      {'id': 1, 'name': 'Id', 'value': 'id'},
      {'id': 2, 'name': 'Order Analog', 'value': 'orderAnalog'}
    ];
    return ecgField;
  }

  getClinicsList() {
    let clinicList = [
      {'id': 1, 'name': 'Salman Clinic', 'value': '1'},
      {'id': 2, 'name': 'Ananda Metro Clinic', 'value': '2'},
      {'id': 3, 'name': 'Al Islam Hospital', 'value': '3'}
    ];
    return clinicList;
  }

  // ================================

  getTrxField() {
    let clinicField = [
      {'id': 1, 'name': 'Id Trx', 'value': 'id'},
      {'id': 2, 'name': 'Order Number', 'value': 'orderNumber'}
    ];
    return clinicField;
  }

  getTrxSortField() {
    let clinicField = [
      {'id': 1, 'name': 'Id Trx', 'value': 'id'},
      {'id': 2, 'name': 'Order Number', 'value': 'userCode'},
      {'id': 3, 'name': 'Date Order In', 'value': 'dateOrderIn'}
    ];
    return clinicField;
  }

  //=============

  getTransactionStatusList() {
    let status = [
      {'id': 1, 'status': 'On Validation', 'value' : '1'},
      {'id': 2, 'status': 'On Process', 'value' : '2'},
      {'id': 3, 'status': 'Failed', 'value' : '3'},
      {'id': 4, 'status': 'Cancelled', 'value' : '4'},
      {'id': 5, 'status': 'Expire', 'value' : '5'},
      {'id': 6, 'status': 'Finish', 'value' : '6'}
    ];
    return status;
  }

  getTransactionStatusPaymentList() {
    let status = [
      {'id': 1, 'status': 'Paid', 'value' : '1'},
      {'id': 2, 'status': 'Unpaid', 'value' : '2'}
    ];
    return status;
  }


  getServicesField() {
    let servicesField = [
      {'id': 1, 'name': 'Service Name', 'value': 'nameOfservices'},
      {'id': 2, 'name': 'Service Code', 'value': 'codeOfservices'},
      {'id': 3, 'name': 'Price', 'value': 'price'}
    ];
    return servicesField;
  }

  getServicesSortField() {
    let servicesField = [
      {'id': 1, 'name': 'Service Name', 'value': 'nameOfservices'},
      {'id': 2, 'name': 'Service Code', 'value': 'codeOfservices'},
      {'id': 3, 'name': 'Id Service', 'value': 'id'},
      {'id': 4, 'name': 'Price', 'value': 'price'}
    ];
    return servicesField;
  }

}
