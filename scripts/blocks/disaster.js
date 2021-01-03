const disaster = extend (ItemTurret, "disaster", {});


disaster.buildType = () =>
extendContent(ItemTurret.ItemTurretBuild, disaster, {
	overheat:0,
	heatcap:0,
	cooldown:true,
	toggle:false,
	updateTile(){
		this.super$updateTile();
		
		this.overheat = Math.max(0, this.overheat -= Time.delta);
		this.heatcap = Math.max(0, this.heatcap);
		
		if(this.overheat >= 181) {
			this.toggle = true;
			this.overheat = 180;
			this.heatcap = 5;
		}
		else if(this.overheat == 0) {
			this.toggle = false;
			this.cooldown = true;
		} else this.cooldown = false;
		
		if(this.toggle && this.heatcap > 0) this.heatcap -= (Time.delta / 2);
		
		if(!this.toggle && this.cooldown && this.heatcap > 0) this.heatcap -= (Time.delta / 30);
		
		print("overheat: " + this.overheat)
		print("heatcap: " + this.heatcap)
		
	},
	
	shoot(type){
		if(!this.toggle) {
			this.super$shoot(type);
			if(this.heatcap < 5) this.heatcap += 1
			else {
				this.overheat += 16
				this.heatcap = 5
			}
		}
    },
	updateShooting(){
		if(this.toggle) return;
		this.super$updateShooting()
	},
	baseReloadSpeed(){
		return this.efficiency() * (1 + (this.heatcap/5));
	}
});