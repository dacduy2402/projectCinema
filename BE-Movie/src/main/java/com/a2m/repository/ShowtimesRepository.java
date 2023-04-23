package com.a2m.repository;

import com.a2m.entities.Movies;
import com.a2m.entities.Showtimes;
import com.a2m.model.response.ShowtimeDateResponse;
import com.a2m.model.response.ShowtimeResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface ShowtimesRepository extends JpaRepository<Showtimes, Long> {

    @Query("SELECT DISTINCT new ShowtimeResponse (st.movie.id, st.movie.name, st.movie.poster, st.movie.category.name, st.movie.startDate) FROM Showtimes st WHERE date(st.date) = :today AND st.isDelete <> true")
    List<ShowtimeResponse> today(Date today);

    @Query("SELECT DISTINCT new ShowtimeResponse (st.movie.id, st.movie.name, st.movie.poster, st.movie.category.name, st.movie.startDate) FROM Showtimes st WHERE st.isDelete <> true")
    List<ShowtimeResponse> getAllShowtimeActive();

    @Query("SELECT DISTINCT new ShowtimeDateResponse (st.date) FROM Showtimes st WHERE st.movie.id = :idMovie AND st.isDelete <> true AND date(st.date) >= :today")
    List<ShowtimeDateResponse> findByMovie(Long idMovie, Date today);

    @Query("SELECT st FROM Showtimes st WHERE st.movie.id = :idMovie AND date(st.date) = :date")
    List<Showtimes> getShowtimeByMovieAndDate(Long idMovie, Date date);
}
