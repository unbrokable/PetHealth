const HOST_API = "https://localhost:44359/api/";
//export const HUB_NOTIFICATION_API = "https://localhost:44392/hubs/notification";

// authorize

export const LOGIN_API = HOST_API + "account/login";
export const REGISTRATION_API = HOST_API + "account/registration";

// admin

export const ADMIN_USERS_API = HOST_API + "admin/users";
export const ADMIN_REMOVEUSERS_API = HOST_API + "admin/users/removes";

// pets

export const PETS_API = HOST_API + "pets";
export const PETS_CLINC_API = HOST_API + "pets/clinics";

// health record

export const HEALTH_RECORD_API = HOST_API + "healthrecords";

// clinic

export const CLINIC_API = HOST_API + "clinic";
export const CLINIC_PETS_API = HOST_API + "clinic/pets";
