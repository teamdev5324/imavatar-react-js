export interface SystemState {
  counter: {
    count: {
      number: number;
      loader: boolean;
      error: any;
    };
  };
  signup: {
    loader: boolean;
    error: any;
    data: any;
    is_signup: boolean;
  };
  signin: {
    loader: boolean;
    error: any;
    token: any;
    is_signin: boolean;
  };
  profile: {
    loader: boolean;
    error: any;
    userId: string;
    user: {
      firstName: string;
      lastName: string;
      phoneNumber: string;
      emailId: string;
      id: string;
    };
    bank: {
      accountHolderName: string;
      accountNumber: string;
      ifscCode: string;
      bankName: string;
      documentId: string;
      branchName: string;
    };
    businessInfo: {
      addressLine: string;
      country: string;
      state: string;
      city: string;
      pincode: string;
      businessName: string;
    };
    gst: {
      gstinNumber: string;
      mobile: string;
      email: string;
      panNumber: string;
    };
    whatsappInfo: {
      whatsappNumber: string;
      notify: true;
      activateNumber: true;
    };
    aggreements: [];
  };
}
