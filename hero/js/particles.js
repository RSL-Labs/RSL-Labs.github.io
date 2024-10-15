let particleTemplate ={};

const Particles = {	
						tick: function(args){
							this.pList.forEach(a => {
									a.timer--
								});
							this.pList = this.pList.filter(a => a.timer > 0);
						},

						add: function(args){
							let animTimer = args?.timer ?? 5;
							
							if(this.check(args)){
								this.pList[this.pList.findIndex(a => a.name == args.anim)].timer = animTimer
							}else{
								this.pList.push({name:args.anim, timer:animTimer, ...args.opts})
							}
						},

						check: function(args){
							if(this.pList.some(a => a.name == args.anim)){
								return true
							}else{
								return false
							}
						},

						draw: function(args){
							this.pList.forEach(p => {
					        	let actualCoords = drawSpriteRotated({
													spritesheet:"effectAnimate" in p ? window[`effect${perClock(2, "milliseconds", 2)-1}_spritesheet`] : p.spritesheet, 
													sprite_index:Array.isArray(p.sprite_index) ? p.sprite_index[perClock(p.sprite_index.length, "milliseconds", p.sprite_index.length)-1] : p.sprite_index,
													x:p.x += (p?.dx ?? 0),
													y:p.y += (p?.dy ?? 0),
													rotation: p.rotation +("animRotateRate" in p ? p.timer*p.animRotateRate : 0),
													...("draw_scale" in p) && {scale:p.draw_scale},
									});
					        	
					        	if(p.colliding){
					        		this.collide({particle:p,...actualCoords})
					        	}
					        });
						},

						collide(args){
							console.log(args)
							let targetTile = getTile(args.x, args.y)

							if(!targetTile.passable){
								console.log("particle hit obstacle")

								args.particle.timer = 0;

							}else if(targetTile.entity && targetTile.entity.isMonster){
								console.log("particle hit entity")
								Battle.round(player, targetTile.entity, player.EQUIPMENT.range[0].attack_type);
								args.particle.timer = 0;

							}
						},

						pList:[],
					};