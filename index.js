const fetch = require("node-fetch")
module.exports = class{
  constructor(token) {
    this.token = token
	}
	async getUUid(name){
		const res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${name}`)
		if(!res.ok)return null;
		return (await res.json()).id
	}
	async getHistory(name){
		if(!name)return null;
		const uuid = await this.getUUid(name)
		if(!uuid)return null;
		const data = await this.getFriendByUUid(uuid)
		if(!data)return null;
		return data
	}
	async getInfo(name){
		if(!name)return null;
		const uuid = await this.getUUid(name)
		if(!uuid)return null;
		const data = await this.getInfoByUUid(uuid)
		if(!data)return null;
		return data
	}
	async getFriend(name){
		if(!name)return null;
		const uuid = await this.getUUid(name)
		if(!uuid)return null;
		const data = await this.getFriendByUUid(uuid)
		if(!data)return null;
		return data
	}
	async getStatus(name){
		if(!name)return null;
		const uuid = await this.getUUid(name)
		if(!uuid)return null;
		const data = await this.getStatusByUUid(uuid)
		if(!data)return null;
		return data
	}
	async getGuild(name){
		if(!name)return null;
		const uuid = await this.getUUid(name)
		if(!uuid)return null;
		const data = await this.getGuildByUUid(uuid)
		if(!data)return null;
		return data
	}
	async getData(name){
		if(!name)return null;
		const uuid = await this.getUUid(name)
		if(!uuid)return null;
		const data = await this.getDataByUUid(uuid)
		if(!data)return null;
		return data
	}
	async getInfo2(name){
		const data = await this.getInfo(name)
		if(!data)return null;
		return data.properties.map(a=>a.value = JSON.parse(new Buffer.from(a.value,"base64").toString()))
	}
  async getHistoryByUUid(uuid){
		const res = await fetch(`https://api.mojang.com/user/profiles/${uuid}/names`)
    if(!res.ok)return null;
		return (await res.json())
	}
	async getInfoByUUid(uuid){
		const res = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`)
		if(!res.ok)return null;
		return (await res.json())
	}
  async getFriendByUUid(uuid){
		if(!uuid)return null;
    const data = (await (await fetch(`https://api.hypixel.net/friends?uuid=${uuid}&key=${this.token}`)).json());
    if(data.success)return data.records;
    return null;
  }
	async getStatusByUUid(uuid){
		if(!uuid)return null;
    const data = (await (await fetch(`https://api.hypixel.net/status?uuid=${uuid}&key=${this.token}`)).json());
    if(data.success)return data.session;
    return null;
	}
	async getGuildByUUid(uuid){
		if(!uuid)return null;
    const data = (await (await fetch(`https://api.hypixel.net/guild?player=${uuid}&key=${this.token}`)).json());
    if(data.success)return data.guild;
    return null;
	}
	async getDataByUUid(uuid){
		if(!uuid)return null;
    const data = (await (await fetch(`https://api.hypixel.net/player?uuid=${uuid}&key=${this.token}`)).json());
    if(data.success)return data.player;
    return null;
	}
}