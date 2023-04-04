package com.a2m.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.a2m.jwt.JwtUtil;
import com.a2m.model.request.JwtRequest;
import com.a2m.model.response.JwtResponse;
import com.a2m.repository.AccountsRepository;
import com.a2m.service.MyUserDetailsService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("")
@AllArgsConstructor
public class AuthController {
	
	private AuthenticationManager authenticationManager;

	private JwtUtil jwtTokenUtil;

	private MyUserDetailsService userDetailsService;
	
	AccountsRepository accountsRepository;

	@GetMapping("/hello")
	public String get() {
		return "Hello";
	}

	@GetMapping("/authen")
	public String get2() {
		return "Authen";
	}
	@GetMapping("/authoEm")
	public String get3() {
		return "authoEm";
	}
	@GetMapping("/authoCu")
	public String get4() {
		return "authoCu";
	}
	@GetMapping("/authoAd")
	public String get5() {
		return "authoAd";
	}
	

	@PostMapping("/login")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest jwtRequest) throws Exception {
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword()));
		} catch (BadCredentialsException e) {
			throw new Exception("Tài khoản hoặc mật khẩu sai", e);
		}
		final UserDetails userDetails = userDetailsService.loadUserByUsername(jwtRequest.getUsername());

		final String jwt = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new JwtResponse(jwt));
	}
}