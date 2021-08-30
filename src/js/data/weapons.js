import weaponLocalizeStrings from "../../assets/weaponLocalizeStrings";
import ttt from "../../assets/ttt_english.str?raw";
import iw4mp from "../../assets/iw4mp_english.str?raw";
import iw4x from "../../assets/iw4x_english.str?raw";

export function getWeaponDisplayName(weapon) {
	if (!weaponLocalizeStrings[weapon]) return weapon;
	const str = ttt + iw4x + iw4mp;
	const name = str.match(new RegExp(`${weaponLocalizeStrings[weapon]}\\nLANG_ENGLISH\\s*"(.*?)"`));
	if (!name) return weapon;
	return name[1];
}
