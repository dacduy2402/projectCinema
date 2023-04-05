package com.a2m.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "seats")
public class Seats {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "number")
    private Integer number;

    @ManyToOne
    @JoinColumn(name = "seat_type_id", referencedColumnName = "id")
    private SeatTypes seatType;

    @ManyToOne
    @JoinColumn(name = "room_id", referencedColumnName = "id")
    private Rooms room;

    @Column(name = "status")
    private Integer status;

    @JsonIgnore
    @OneToMany(mappedBy = "seat")
    private List<Tickets> listTickets;

}
