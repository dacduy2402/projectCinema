package com.a2m.service;

import com.a2m.entities.Showtimes;

import java.util.Date;
import java.util.List;

public interface ShowtimeService {
    List<Showtimes> findByDate(Date date);
}