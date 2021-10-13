type Channel = any;

export default class ChannelManager {
  public channel: Channel;

  constructor() {}

  public data(channel: Channel) {
    this.channel = channel;
  }
}
