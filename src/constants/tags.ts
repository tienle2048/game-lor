import { CollisionGroupManager } from "excalibur";

export const PLAYER_TAG = "Player";
export const MONTER_TAG = "Monter"
export const BOSS_TAG = "Boss"
export const PET_TAG = "Pet"

export const WEAPON_TAG = "Weapon"


export const PlayerCollisionGroup = CollisionGroupManager.create(PLAYER_TAG)
export const MonterCollisionGroup = CollisionGroupManager.create(MONTER_TAG)
export const BossCollisionGroup = CollisionGroupManager.create(BOSS_TAG)
export const PetCollisionGroup = CollisionGroupManager.create(PET_TAG)

export const WeaponCollisionGroup = CollisionGroupManager.create(WEAPON_TAG)
