package com.wellsfargo.training.ppb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {

	@Autowired
	private JavaMailSender mailSender;
	
	public String sendSimpleEmail(String toEmail, String Body, String Subject) {
		SimpleMailMessage message = new SimpleMailMessage();
		
		message.setFrom("prestigeprimebank@gmail.com");
		message.setTo(toEmail);
		message.setText(Body);
		message.setSubject(Subject);
		mailSender.send(message);
		return "mail sent...";
	}
}
