import DefaultUserThumbnail from 'assets/img/default_thumbnail_square_clear.png';

export default function showUserThumbnail(thumbnailPath) {
    if (thumbnailPath != null) {
        return thumbnailPath;
    }
    else {
        return DefaultUserThumbnail;
    }
}