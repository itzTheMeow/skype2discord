type ChannelTypes =
  | "GUILD_TEXT"
  | "GUILD_VOICE"
  | "GUILD_CATEGORY"
  | "GUILD_NEWS"
  | "GUILD_STORE"
  | "GUILD_NEWS_THREAD"
  | "GUILD_PUBLIC_THREAD"
  | "GUILD_PRIVATE_THREAD"
  | "GUILD_STAGE_VOICE";

export interface User {
  id: string;
  bot: boolean;
  system: boolean;
  flags: number;
  username: string;
  discriminator: string;
  avatar: any;
  banner: any;
  accentColor: any;
  verified: boolean;
  mfaEnabled: boolean;
  createdTimestamp: number;
  defaultAvatarURL: string;
  hexAccentColor: any;
  tag: string;
  avatarURL: string | null;
  displayAvatarURL: string | null;
  bannerURL: string | null;
}

export interface Member {
  guildId: string;
  joinedTimestamp: number;
  premiumSinceTimestamp: number | null;
  deleted: boolean;
  nickname: string | null;
  pending: boolean;
  userId: string;
  displayName: string;
  roles: string[];
  avatar: any;
  avatarURL: string;
  displayAvatarURL: string;
}

export interface Attachment {
  attachment: string;
  name: string;
  id: string;
  size: number;
  url: string;
  proxyURL: string;
  height: number;
  width: number;
  contentType: string;
  ephemeral: boolean;
}

export interface Message {
  channelId: string;
  guildId: string;
  deleted: false;
  id: string;
  createdTimestamp: number;
  type: string;
  system: false;
  content: string;
  authorId: string;
  pinned: boolean;
  tts: boolean;
  nonce: any;
  embeds: any[];
  components: any[];
  attachments: Attachment[];
  stickers: any[];
  editedTimestamp: number | null;
  editedAt: number | null;
  webhookId: any;
  groupActivityApplicationId: any;
  applicationId: any;
  activity: any;
  flags: number;
  reference: any;
  interaction: any;
  cleanContent: string;
  author: User;
  channel: TextChannel;
  guild: Server;
  member: Member;
}

type Channels = Channel | TextChannel | VoiceChannel;
export interface Channel {
  type: ChannelTypes;
  deleted: boolean;
  guild: string;
  guildId: string;
  parentId: string | null;
  permissionOverwrites: string[];
  id: string;
  name: string;
  rawPosition: number;
  parent: any;
  canSend: boolean;
  createdTimestamp: number;
}
export interface TextChannel extends Channel {
  messages: Message[];
  threads: any[];
  nsfw: false;
  topic: string | null;
  lastMessageId: string | null;
  lastPinTimestamp: number | null;
  rateLimitPerUser: number;
}
export interface VoiceChannel extends Channel {
  rtcRegion: any | null;
  bitrate: number;
  userLimit: number;
}

export interface Role {
  guild: string;
  id: string;
  name: string;
  color: number;
  hoist: boolean;
  rawPosition: number;
  permissions: string;
  managed: boolean;
  mentionable: boolean;
  deleted: boolean;
  icon: any;
  unicodeEmoji: any;
  createdTimestamp: number;
}

export interface Server {
  id: string;
  name: string;
  icon: string;
  features: string[];
  commands: any[];
  members: Member;
  channels: Channels[];
  bans: any[];
  roles: Role[];
  stageInstances: any[];
  invites: any[];
  deleted: boolean;
  shardId: number;
  splash: any;
  banner: any;
  description: string;
  verificationLevel: "NONE" | "LOW" | "MEDIUM" | "HIGH" | "VERY_HIGH";
  vanityURLCode: any;
  nsfwLevel: "DEFAULT" | "EXPLICIT" | "SAFE" | "AGE_RESTRICTED";
  discoverySplash: any;
  memberCount: number;
  large: boolean;
  applicationId: any;
  afkTimeout: number;
  afkChannelId: string | null;
  systemChannelId: string | null;
  premiumTier: "NONE" | "TIER_1" | "TIER_2" | "TIER_3";
  premiumSubscriptionCount: number;
  explicitContentFilter: "DISABLED" | "MEMBERS_WITHOUT_ROLES" | "ALL_MEMBERS";
  mfaLevel: "NONE" | "ELEVATED";
  joinedTimestamp: number;
  defaultMessageNotifications: "ALL_MESSAGES" | "ONLY_MENTIONS";
  systemChannelFlags: number;
  maximumMembers: number;
  maximumPresences: any;
  approximateMemberCount: any;
  approximatePresenceCount: any;
  vanityURLUses: any;
  rulesChannelId: string | null;
  publicUpdatesChannelId: string | null;
  preferredLocale: string;
  ownerId: string;
  emojis: string[];
  stickers: string[];
  createdTimestamp: number;
  nameAcronym: string;
  iconURL: string | null;
  splashURL: string | null;
  discoverySplashURL: string | null;
  bannerURL: string | null;
}
