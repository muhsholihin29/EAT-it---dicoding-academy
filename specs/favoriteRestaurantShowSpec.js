import FavoriteRestaurantSearchView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-view';
import FavoriteRestaurantShowPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-show-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';

describe('Showing all favorite restaurants', () => {
    let view;

    const renderTemplate = () => {
        view = new FavoriteRestaurantSearchView();
        document.body.innerHTML = view.getTemplate();
    };

    beforeEach(() => {
        renderTemplate();
    });

    describe('When no restaurants have been liked', () => {
        it('should ask for the favorite restaurants', () => {
            const favoriteRestaurants = spyOnAllFunctions(
                FavoriteRestaurantIdb
            );

            new FavoriteRestaurantShowPresenter({
                view,
                favoriteRestaurants,
            });

            expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(
                1
            );
        });

        it('should show the information that no restaurants have been liked', (done) => {
            document
                .getElementById('restaurants')
                .addEventListener('restaurants:updated', () => {
                    expect(
                        document.querySelectorAll(
                            '.restaurant-item__not__found'
                        ).length
                    ).toEqual(1);

                    done();
                });

            const favoriteRestaurants = spyOnAllFunctions(
                FavoriteRestaurantIdb
            );
            favoriteRestaurants.getAllRestaurants.and.returnValues([]);

            new FavoriteRestaurantShowPresenter({
                view,
                favoriteRestaurants,
            });
        });
    });

    describe('When favorite restaurants exist', () => {
        it('should show the restaurants', (done) => {
            document
                .getElementById('restaurants')
                .addEventListener('restaurants:updated', () => {
                    expect(
                        document.querySelectorAll('.restaurant-item').length
                    ).toEqual(2);
                    done();
                });

            const favoriteRestaurants = spyOnAllFunctions(
                FavoriteRestaurantIdb
            );
            favoriteRestaurants.getAllRestaurants.and.returnValues([
                {
                    id: 11,
                    title: 'A',
                    rating: 3,
                    description: 'Sebuah film A',
                },
                {
                    id: 22,
                    title: 'B',
                    rating: 4,
                    description: 'Sebuah film B',
                },
            ]);

            new FavoriteRestaurantShowPresenter({
                view,
                favoriteRestaurants,
            });
        });
    });
});
