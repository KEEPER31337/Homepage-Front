import StringLogo from 'assets/img/keeper_logo_string.png';

export default function showPostThumbnail(thumbnailPath) {
    if (thumbnailPath != null) {
        return thumbnailPath;
    }
    else {
        return StringLogo;
    }
}