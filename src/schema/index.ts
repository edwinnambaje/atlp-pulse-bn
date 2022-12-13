import { gql } from 'apollo-server';

const Schema = gql`
  type Cohort {
    name: String
    phase: Phase
    coordinator: User
  }

  type Team {
    id: ID!
    name: String
    cohort: Cohort
  }
  type User {
    id: ID!
    role: String!
    email: String!
    password: String!
    profile: Profile
    cohort: Cohort
    organizations: [String!]!
    team: Team
  }
  input RegisterInput {
    email: String!
    password: String!
    role: String
  }

  input LoginInput {
    email: String
    password: String
    orgToken: String
  }
  input OrgInput {
    name: String
  }
  type Profile {
    id: ID!
    user: User!
    firstName: String
    lastName: String
    name: String
    address: String
    city: String
    country: String
    phoneNumber: String
    biography: String
    avatar: String
    cover: String
  }

  type UserRole {
    id: ID!
    name: String!
  }
  type RegisteredUser {
    token: String
    user: User
  }
  type Login {
    token: String
    user: User
  }
  type OrgLogin {
    token: String
    organization: Organization
  }
  type Organization {
    id: ID!
    name: String!
    description: String
    admin: User
  }
  input OrganizationInput {
    email: String!
    name: String!
    description: String
  }

  type Rating {
    user: User!
    sprint: Int!
    reply: [Notifications]
    quantity: String!
    quantityRemark: String
    bodyQuantity: String
    quality: String!
    qualityRemark: String
    bodyQuality: String
    professional_Skills: String!
    professionalRemark: String
    bodyProfessional: String
    approved: Boolean!
    coordinator: String!
    cohort: Cohort!
  }

  type AddRating {
    user: User!
    sprint: Int!
    reply: [Notifications]
    quantity: String!
    quantityRemark: String
    bodyQuantity: String
    quality: String!
    qualityRemark: String
    bodyQuality: String
    professional_Skills: String!
    professionalRemark: String
    bodyProfessional: String
    approved: Boolean!
    coordinator: String!
  }

  type updateRating {
    user: String
    sprint: Int
    quantity: [String]
    quantityRemark: [String]
    quality: [String]
    qualityRemark: [String]
    professional_Skills: [String]
    professionalRemark: [String]
    approved: Boolean
  }
  type updateToReply {
    user: String
    sprint: Int
    quantity: [String]
    bodyQuantity: [String]
    quantityRemark: [String]
    bodyQuality: [String]
    quality: [String]
    qualityRemark: [String]
    professional_Skills: [String]
    professionalRemark: [String]
    bodyProfessional: String
    approved: Boolean
  }

  type FetchRatingForAdmin {
    user: User!
    sprint: Int
    quantity: [String]
    quantityRemark: [String]
    quality: [String]
    qualityRemark: [String]
    professional_Skills: [String]
    professionalRemark: [String]
    approved: Boolean
    cohort: Cohort
  }

  type ApproveRating {
    user: String!
    sprint: Int!
    quantity: String!
    quantityRemark: String
    quality: String!
    qualityRemark: String
    professional_Skills: String!
    professionalRemark: String
    approved: Boolean!
  }

  type Query {
    getAllUsers: [User]
    getUsers(orgToken: String): [User]
    getProfile: Profile
    getAllRoles: [UserRole]
    getRole(id: ID!): UserRole
    getOrganizations: [Organization]!
    getOrganization(name: String!): Organization
    getSignupOrganization(orgToken: String!): Organization
    fetchRatings(orgToken: String): [Rating]
    fetchTrainees: [Cohort]
    fetchRatingsForAdmin(orgToken: String): [FetchRatingForAdmin]
    fetchRatingsTrainee: [Rating]
    fetchAllRatings(orgToken: String): [Rating]
    fetchCohortsCoordinator(cohortName: ID!): [Cohort]
    verifyResetPasswordToken(token: String!): String
    getAllTeams(orgToken: String): [Team!]
    getAllTeamInCohort(orgToken: String, cohort: String): [Team!]
  }

  type Mutation {
    createUserRole(name: String!): UserRole!
    createUser(
      firstName: String!
      lastName: String!
      dateOfBirth: DateTime!
      gender: String!
      email: String!
      password: String!
      orgToken: String!
      role: String
    ): RegisteredUser!
    loginUser(loginInput: LoginInput): Login!
    loginOrg(orgInput: OrgInput): OrgLogin!
    requestOrganization(organizationInput: OrganizationInput!): String!
    addOrganization(organizationInput: OrganizationInput): Organization!
    updateProfile(
      lastName: String
      firstName: String
      address: String
      city: String
      country: String
      phoneNumber: String
      biography: String
      fileName: String
      cover: String
    ): Profile

    createProfile(
      lastName: String
      firstName: String
      address: String
      city: String
      country: String
      phoneNumber: String
      biography: String
      fileName: String
      cover: String
    ): Profile
    updateAvatar(avatar: String): Profile
    updateCoverImage(cover: String): Profile
    updateUserRole(id: ID!, name: String): User!
    deleteOrganization(id: ID!): Organization
    addRatings(
      user: String!
      sprint: Int!
      quantity: String!
      quantityRemark: String
      quality: String!
      bodyQuality: String
      qualityRemark: String
      professional_Skills: String!
      bodyQuantity: String
      professionalRemark: String
      bodyProfessional: String
      orgToken: String!
    ): AddRating
    updateRating(
      user: String!
      sprint: Int!
      quantity: [String]
      quantityRemark: [String]
      quality: [String]
      qualityRemark: [String]
      professional_Skills: [String]
      professionalRemark: [String]
      orgToken: String!
    ): updateRating
    updateToReply(
      user: String!
      sprint: Int!
      quantity: [String]
      bodyQuantity: [String]
      quantityRemark: [String]
      quality: [String]
      bodyQuality: [String]
      qualityRemark: [String]
      professional_Skills: [String]
      professionalRemark: [String]
      bodyProfessional: [String]
      orgToken: String!
    ): updateToReply

    approveRating(user: String!, sprint: Int!): ApproveRating
    rejectRating(user: String!, sprint: Int!): String!
    forgotPassword(email: String!): String!
    resetUserPassword(
      password: String!
      confirmPassword: String!
      token: String!
    ): String!
    addTeam(name: String!, cohortName: String!): Team!
  }
  type ratingSystem {
    id: ID!
    name: String!
    grade: [String]!
    description: [String]!
    percentage: [String]!
    userId: String!
  }
  type Mutation {
    createRatingSystem(
      name: String!
      grade: [String]!
      description: [String]!
      percentage: [String]!
    ): ratingSystem!
    deleteRatingSystem(id: ID!): String!
  }
  type Query {
    getRatingSystems: [ratingSystem]
    getRatingSystem(id: ID!): ratingSystem!
  }
  type Notifications {
    id: ID!
    user: String!
    sprint: Int!
    quantityRemark: String!
    qualityRemark: String!
    professionalRemark: String!
    bodyQuantity: String
    bodyQuality: String
    bodyProfessional: String
    createdAt: String!
  }
  type Query {
    getReplies: [Notifications]
    getRepliesByUser(userId: String): [Notifications]
    getTeamTrainees(orgToken: String, team: String): [User]
  }

  type Mutation {
    addReply(
      sprint: Int!
      bodyQuantity: String
      bodyQuality: String
      bodyProfessional: String
    ): Notifications!
    deleteReply(id: ID): String!
    deleteTeam(id: ID!): String!
    updateTeam(id: ID!, orgToken: String, name: String): Team
  }
`;
export default Schema;
