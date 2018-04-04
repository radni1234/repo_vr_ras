package com.vr.rasveta.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.vr.rasveta.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.vr.rasveta.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.vr.rasveta.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.vr.rasveta.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.vr.rasveta.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.vr.rasveta.domain.Opstina.class.getName(), jcacheConfiguration);
            cm.createCache(com.vr.rasveta.domain.Mesto.class.getName(), jcacheConfiguration);
            cm.createCache(com.vr.rasveta.domain.StubTip.class.getName(), jcacheConfiguration);
            cm.createCache(com.vr.rasveta.domain.Stub.class.getName(), jcacheConfiguration);
            cm.createCache(com.vr.rasveta.domain.SvetiljkaTip.class.getName(), jcacheConfiguration);
            cm.createCache(com.vr.rasveta.domain.Svetiljka.class.getName(), jcacheConfiguration);
            cm.createCache(com.vr.rasveta.domain.JedMere.class.getName(), jcacheConfiguration);
            cm.createCache(com.vr.rasveta.domain.IntervencijaTip.class.getName(), jcacheConfiguration);
            cm.createCache(com.vr.rasveta.domain.MaterijalTip.class.getName(), jcacheConfiguration);
            cm.createCache(com.vr.rasveta.domain.Status.class.getName(), jcacheConfiguration);
            cm.createCache(com.vr.rasveta.domain.UgovorMaterijal.class.getName(), jcacheConfiguration);
            cm.createCache(com.vr.rasveta.domain.UgovorMaterijalStav.class.getName(), jcacheConfiguration);
            cm.createCache(com.vr.rasveta.domain.UgovorIntervencija.class.getName(), jcacheConfiguration);
            cm.createCache(com.vr.rasveta.domain.UgovorIntervencijaStav.class.getName(), jcacheConfiguration);
            cm.createCache(com.vr.rasveta.domain.Prijava.class.getName(), jcacheConfiguration);
            cm.createCache(com.vr.rasveta.domain.PrijavaStatus.class.getName(), jcacheConfiguration);
            cm.createCache(com.vr.rasveta.domain.PrijavaIntervencija.class.getName(), jcacheConfiguration);
            cm.createCache(com.vr.rasveta.domain.PrijavaMaterijal.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
