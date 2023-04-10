function calculatePercentageRating(reviews = [], rating) {
    const ratingFilterLength = reviews.filter(
        (review) => review.rating === rating
    ).length;

    return Math.round((ratingFilterLength / reviews.length) * 100);
}

export default calculatePercentageRating;
