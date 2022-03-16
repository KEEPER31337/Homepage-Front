import KeyLogo from 'assets/img/keeper_logo_key.png';

export default function showUserThumbnail(thumbnailPath) {
    if (thumbnailPath != null) {
        return thumbnailPath;
    }
    else {
        return KeyLogo;
    }
}