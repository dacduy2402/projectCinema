package com.a2m.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tickets")
public class Tickets {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "ticket_id")
    private String ticketId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "bill_id")
    private Bills bill;

    @ManyToOne
    @JoinColumn(name = "showtime_id", referencedColumnName = "id")
    private Showtimes showtime;

    @ManyToOne
    @JoinColumn(name = "seat_id", referencedColumnName = "id")
    private Seats seat;

    @ManyToOne
    @JoinColumn(name = "fare_id", referencedColumnName = "id")
    private Fares fare;

    @Column(name = "create_date")
    private Date createDate;

    @Column(name = "create_by")
    private String createBy;

    @Column(name = "status")
    private Integer status;

}
