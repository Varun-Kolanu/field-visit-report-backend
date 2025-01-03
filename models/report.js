import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ['poly', 'engg'],
        required: true
    },
    officers: {
        type: [{
            name: String,
            designation: String
        }],
        default: []
    },
    institute_name: String,
    start_date: String,
    end_date: String,
    unique_code: String,
    principal_name: String,
    principal_contact: String,

    year1_admission: Number,
    year1_present: Number,
    year2_admission: Number,
    year2_present: Number,
    year3_admission: Number,
    year3_present: Number,
    year4_admission: Number,
    year4_present: Number,
    mtech_1_admission: Number,
    mtech_1_present: Number,
    mtech_2_admission: Number,
    mtech_2_present: Number,

    faculty_fulltime_posted: Number,
    faculty_fulltime_present: Number,
    faculty_contractual_posted: Number,
    faculty_contractual_present: Number,
    faculty_guest_posted: Number,
    faculty_guest_present: Number,
    faculty_total_posted: Number,
    faculty_total_present: Number,

    boys_hostels: Number,
    boys_hostels_capacity: Number,
    num_boys_avail: Number,
    girls_hostels: Number,
    girls_hostels_capacity: Number,
    num_girls_avail: Number,
    total_hostels: Number,
    total_hostels_capacity: Number,
    num_students_avail: Number,
    num_faculty_residence: Number,
    num_other_staffs_residence: Number,
    num_faculty_inside: Number,
    num_other_staffs_inside: Number,
    num_faculty_outside: Number,
    num_other_staffs_outside: Number,
    reason_faculty_outside: String,
    reason_other_staffs_outside: String,

    num_classes_expected: Number,
    num_classes_undertaken: Number,
    num_biometric_avail: Number,
    num_biometric_functional: Number,
    is_manual_attendance: String,
    is_app_based_attendance: String,

    is_dedicated_feeder_installed: String,
    feeder_hrs_avail: Number,
    is_power_backup_avail: String,
    power_backup_source: String,
    was_solar_backup_by_breda: String,

    num_classrooms_required: Number,
    num_classrooms_functional: Number,
    num_labs_required: Number,
    num_labs_functional: Number,
    num_students_enrolled: Number,
    are_equipments_used: String,
    reason_equipments_no_use: String,
    is_lang_lab_established: String,
    is_lang_lab_functional: String,
    num_lang_students_registered: Number,

    num_books_required: Number,
    num_books_avail: Number,
    num_journals_required: Number,
    num_journals_avail: Number,
    is_internet_installed: String,
    internet_speed: String,
    reason_no_internet: String,
    is_networking_installed: String,
    is_augmentation_undertaken: String,
    reason_no_networking: String,

    is_computer_procured: String,
    percent_computers_utilized: Number,
    reason_no_computer: String,
    is_equipment_procured: String,
    percent_equipment_utilized: Number,
    reason_no_equipment: String,
    is_library_functional: String,
    students_enrolled_in_library: Number,
    students_using_library: Number,
    is_ids_registered: String,
    was_ids_bank_acc_opened: String,
    is_ec_meeting_held_on_time: String,

    was_consultancy_work_started: String,
    num_projects_category1: Number,
    num_projects_category2: Number,
    num_projects_category3: Number,
    num_projects_category4: Number,
    consultancy_amount_earned: Number,
    consultancy_amount_distributed: Number,
    consultancy_amount_rest: Number,
    scope_for_consultancy: String,

    are_cell_meetings_ok: String,
    reason_cell_non_functioning: String,
    is_women_helpline_no_functional: String,
    reason_women_helpline_no_functional: String,
    is_water_supply_installed: String,
    reason_water_supply_not_installed: String,
    is_cctv_installed: String,
    reason_cctv_not_installed: String,
    num_nba_acc_files: Number,
    num_pahal_students: Number,
    num_pahal_classes: Number,

    is_disclosure_made_public: String,
    reason_disclosure_not_made_public: String,
    is_mess_functional: String,
    mess_run_by: String,
    ac_dc_pending_amount: Number,
    ac_dc_settled_amount: Number,
    total_amount_with_college: Number,
    utilized_amount_as_on_date: Number,

    major_observations: String,
    recommendations: String,
    location: {
        coordinates: {
            type: [String],
            default: ["", ""]
        },
        address: String
    },
    image_url: String
});

export const Report = mongoose.model("Report", schema);
