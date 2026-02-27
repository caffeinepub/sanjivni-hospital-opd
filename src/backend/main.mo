import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  module Gender {
    public type Gender = {
      #male;
      #female;
      #other;
    };
  };

  type OPDRecord = {
    patientName : Text;
    age : Nat;
    address : Text;
    gender : Gender.Gender;
    appointmentDate : Text;
    doctorName : Text;
  };

  module OPDRecord {
    public func compare(record1 : OPDRecord, record2 : OPDRecord) : Order.Order {
      switch (Text.compare(record1.appointmentDate, record2.appointmentDate)) {
        case (#equal) { Text.compare(record1.patientName, record2.patientName) };
        case (order) { order };
      };
    };
  };

  public type PatientProfile = {
    name : Text;
    email : Text;
  };

  module PatientProfile {
    public func compare(profile1 : PatientProfile, profile2 : PatientProfile) : Order.Order {
      Text.compare(profile1.name, profile2.name);
    };
  };

  let patientProfiles = Map.empty<Principal, PatientProfile>();
  let opdRecords = Map.empty<Principal, [OPDRecord]>();

  // Authorization system state + core logic
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public shared ({ caller }) func registerPatient(name : Text, email : Text) : async () {
    // Prevent anonymous principals from registering
    if (caller.isAnonymous()) {
      Runtime.trap("Anonymous users cannot register");
    };

    if (patientProfiles.containsKey(caller)) {
      Runtime.trap("Patient already registered");
    };

    let patientProfile : PatientProfile = {
      name;
      email;
    };
    patientProfiles.add(caller, patientProfile);
  };

  public query ({ caller }) func getCallerPatientProfile() : async ?PatientProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only registered users can view their profile");
    };
    patientProfiles.get(caller);
  };

  public query ({ caller }) func getPatientProfile(patient : Principal) : async ?PatientProfile {
    if (caller != patient and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    patientProfiles.get(patient);
  };

  // Required by frontend: getCallerUserProfile
  public query ({ caller }) func getCallerUserProfile() : async ?PatientProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    patientProfiles.get(caller);
  };

  // Required by frontend: saveCallerUserProfile
  public shared ({ caller }) func saveCallerUserProfile(profile : PatientProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    patientProfiles.add(caller, profile);
  };

  // Required by frontend: getUserProfile
  public query ({ caller }) func getUserProfile(user : Principal) : async ?PatientProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    patientProfiles.get(user);
  };

  public shared ({ caller }) func submitOPDForm(
    patientName : Text,
    age : Nat,
    address : Text,
    gender : Gender.Gender,
    appointmentDate : Text,
    doctorName : Text,
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only patients can submit OPD forms");
    };

    let record : OPDRecord = {
      patientName;
      age;
      address;
      gender;
      appointmentDate;
      doctorName;
    };

    let existingRecords = switch (opdRecords.get(caller)) {
      case (null) { [] };
      case (?records) { records };
    };

    opdRecords.add(caller, existingRecords.concat([record]));
  };

  public query ({ caller }) func getPatientOPDRecords(patient : Principal) : async [OPDRecord] {
    if (caller != patient and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own records");
    };
    switch (opdRecords.get(patient)) {
      case (null) { [] };
      case (?records) { records };
    };
  };

  public query ({ caller }) func getAllPatientProfiles() : async [PatientProfile] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all patient profiles");
    };
    patientProfiles.values().toArray().sort();
  };

  public query ({ caller }) func getAllOPDRecords() : async [OPDRecord] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all OPD records");
    };

    opdRecords.values().toArray().flatten();
  };
};
