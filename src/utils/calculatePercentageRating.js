function calculatePercentageRating(reviews = [], rating) {
    if (reviews.length <= 0) return 0;

    const ratingFilterLength = reviews.filter(
        (review) => review.rating === rating
    ).length;

    return Math.round((ratingFilterLength / reviews.length) * 100);
}

export default calculatePercentageRating;
