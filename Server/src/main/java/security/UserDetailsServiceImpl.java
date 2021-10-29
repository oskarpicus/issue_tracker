package security;

import exceptions.UserNotFoundException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import service.Service;

import java.util.ArrayList;

public class UserDetailsServiceImpl implements UserDetailsService {
    private final Service service;
    private model.User lastUser;

    public UserDetailsServiceImpl(Service service) {
        this.service = service;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            lastUser = service.login(username);
            return new User(lastUser.getUsername(), lastUser.getPassword(), new ArrayList<>());
        } catch (UserNotFoundException e) {
            throw new UsernameNotFoundException(username);
        }
    }

    public model.User getLastUser() {
        return lastUser;
    }
}
