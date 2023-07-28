import { gql } from 'apollo-server'

const Schema = gql`
  type Cohort {
    name: String
    phase: Phase
    coordinator: User
  }

  type Subscription {
    newRating(receiver: String!): Notification!
    newfeedback(sprint: String, user: String): RatingMessageTemp!
    newfeedbacks(sprint_user: String): newFeedbacks
    newReply: Notification!
  }

  type newFeedbacks {
    sprint: String
    user: String
    data: RatingMessageTemp!
  }

  type Notification {
    id: ID!
    receiver: ID!
    message: String!
    sender: User!
    createdAt: String!
    read: String!
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
  input ActivityInput {
    date: String!
    country_code: String
    country_name: String!
    city: String
    postal: String
    latitude: Float
    longitude: Float
    IPv4: String
    state: String
  }
  input LoginInput {
    email: String
    password: String
    orgToken: String
    activity: ActivityInput!
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
    activity: [Activity]
  }
  type Activity {
    date: String!
    country_code: String
    country_name: String
    city: String
    postal: String
    latitude: Float
    longitude: Float
    IPv4: String
    state: String
    failed: Int
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
    status: String
    gitHubOrganisation: String
    activeRepos: [String]
  }

  type GitHubActivity {
    totalCommits: String!
    pullRequest: pullRequest!
  }

  type pullRequest {
    merged: String!
    closed: String!
    opened: String!
  }

  input OrganizationInput {
    email: String!
    name: String!
    description: String
  }

  type Rating {
    user: User!
    sprint: Int!
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
    average: String
    feedbacks: [RatingMessageTemp]
  }

  type AddRating {
    user: User!
    sprint: Int!
    cohort: Cohort!
    quantity: String!
    quantityRemark: String
    bodyQuantity: String
    quality: String!
    qualityRemark: String
    bodyQuality: String
    professional_Skills: String!
    professionalRemark: String
    bodyProfessional: String
    average: String
    approved: Boolean!
    coordinator: String!
    feedbacks: [RatingMessageTemp]
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

  type RatingMessageTemp {
    sender: User!
    content: String
    createdAt: String
  }

  type Query {
    getAllUsers(orgToken: String): [User]
    getUsers(orgToken: String): [User]
    getAllCoordinators: [User]
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
    fetchRatingByCohort(CohortName: String): [Rating]
    fetchCohortsCoordinator(cohortName: ID!): [Cohort]
    verifyResetPasswordToken(token: String!): String
    getAllTeams(orgToken: String): [Team!]
    getAllTeamInCohort(orgToken: String, cohort: String): [Team!]
    getAllNotification: [Notification]
    gitHubActivity(organisation: String!, username: String!): GitHubActivity!
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
    addOrganization(
      organizationInput: OrganizationInput
      action: String
    ): Organization!
    RegisterNewOrganization(
      organizationInput: OrganizationInput
      action: String
    ): Organization!
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
      githubUsername: String
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
      githubUsername: String
    ): Profile
    updateAvatar(avatar: String): Profile
    updateCoverImage(cover: String): Profile
    updateUserRole(id: ID!, name: String, orgToken: String): User!
    deleteOrganization(id: ID!): Organization
    updateGithubOrganisation(
      name: String!
      gitHubOrganisation: String!
    ): Organization
    addRatings(
      user: String!
      sprint: Int!
      quantity: String!
      quantityRemark: String
      quality: String!
      cohort: String!
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
    AddRatingFeedback(
      sprint: String
      user: String
      content: String
    ): RatingMessageTemp

    approveRating(user: String!, sprint: Int!): ApproveRating
    rejectRating(user: String!, sprint: Int!): String!
    forgotPassword(email: String!): String!
    resetUserPassword(
      password: String!
      confirmPassword: String!
      token: String!
    ): String!
    addTeam(name: String!, cohortName: String!, orgToken: String!): Team!

    addActiveRepostoOrganization(name: String!, repoUrl: String!): Organization!

    deleteActiveRepostoOrganization(
      name: String!
      repoUrl: String!
    ): Organization!
  }
  type ratingSystem {
    id: ID!
    name: String!
    grade: [String]!
    description: [String]!
    percentage: [String]!
    userId: String!
    defaultGrading: Boolean
  }
  type Mutation {
    createRatingSystem(
      name: String!
      grade: [String]!
      description: [String]!
      percentage: [String]!
      orgToken: String!
    ): ratingSystem!
    deleteRatingSystem(id: ID!, orgToken: String): String!
    makeRatingdefault(id: ID): String!
  }

  type Query {
    getRatingSystems(orgToken: String!): [ratingSystem]
    getDefaultGrading: [ratingSystem]
    getRatingSystem(id: ID!, orgToken: String!): ratingSystem!
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
    addNotifications(
      id: ID!
      user: String!
      message: String!
      coordinator: String!
      createdAt: String!
      read: String!
    ): Notification!
    deleteNotifications(id: ID!): String
    markAsRead(id: ID!): String
    markAllAsRead: String
  }
  type Mutation {
    addNotifications(
      id: ID!
      user: String!
      message: String!
      coordinator: String!
      createdAt: String!
      read: String!
    ): Notification!
    deleteNotifications(id: ID!): String
    markAsRead(id: ID!): String
    markAllAsRead: String
  }

  type Mutation {
    addReply(
      sprint: Int!
      bodyQuantity: String
      bodyQuality: String
      bodyProfessional: String
    ): Notifications!
    deleteTeam(id: ID!): String!
    updateTeam(id: ID!, orgToken: String, name: String): Team
    deleteReply: String!
  }
  type Event {
    title: String!
    hostName: String!
    start: String!
    end: String!
    timeToStart: String!
    timeToEnd: String!
  }
  type Mutation {
    createEvent(
      title: String!
      hostName: String!
      start: String!
      end: String!
      timeToStart: String!
      timeToEnd: String!
      authToken: String
    ): Event!
  }
  type Query {
    getEvents(authToken: String): [Event]
  }
`
export default Schema
