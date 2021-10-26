import weaponNames from "../../assets/weaponNames";

export function getWeaponDisplayName(weapon) {
	return weaponNames.get(weapon) ?? weapon;
}
