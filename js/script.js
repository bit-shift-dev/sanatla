document.addEventListener('DOMContentLoaded', () => {
  const forumTopics = document.querySelectorAll('.forum-topic');
  const forumTopicButtons = document.querySelectorAll('[data-forum-topic]');
  if (forumTopics.length && forumTopicButtons.length) {
    const showForumTopic = (topicId) => {
      const selected = Array.from(forumTopics).find((topic) => topic.id === topicId);
      if (!selected) return;
      forumTopics.forEach((topic) => {
        topic.hidden = topic !== selected;
      });
      forumTopicButtons.forEach((button) => {
        button.classList.toggle('active', button.dataset.forumTopic === topicId);
      });
      history.replaceState(null, '', `#${topicId}`);
      selected.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    forumTopicButtons.forEach((button) => {
      button.addEventListener('click', () => showForumTopic(button.dataset.forumTopic));
    });
    document.querySelectorAll('.forum-back').forEach((button) => {
      button.addEventListener('click', () => {
        forumTopics.forEach((topic) => { topic.hidden = true; });
        forumTopicButtons.forEach((topicButton) => topicButton.classList.remove('active'));
        history.replaceState(null, '', window.location.pathname);
        document.querySelector('.forum-topic-menu').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    if (window.location.hash) showForumTopic(window.location.hash.slice(1));
  }

  const artistGrid = document.querySelector('.artist-grid');
  if (artistGrid) {
    const artistMedia = {
      'Leonardo da Vinci': {
        portrait: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/16/Francesco_Melzi_-_Portrait_of_Leonardo_%28colour_correction%29.png/330px-Francesco_Melzi_-_Portrait_of_Leonardo_%28colour_correction%29.png',
        work: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6a/Mona_Lisa.jpg/330px-Mona_Lisa.jpg',
        workPage: 'https://en.wikipedia.org/wiki/Mona_Lisa',
        workName: 'Mona Lisa',
        bio: 'Leonardo, Verrocchio’nun atölyesinde yetiştikten sonra Floransa, Milano ve Roma’da çalıştı. Resimlerinin yanı sıra anatomi, mühendislik ve doğa gözlemlerine ilişkin defterler tuttu. Eserlerinin bir bölümü yarım kaldı; buna rağmen ışık, perspektif ve insan ifadesine yaklaşımı sonraki kuşakları derinden etkiledi.'
      },
      'Michelangelo': {
        portrait: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/02/Michelangelo_Daniele_da_Volterra_%28dettaglio%29.jpg/330px-Michelangelo_Daniele_da_Volterra_%28dettaglio%29.jpg',
        work: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/330px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg',
        workPage: 'https://en.wikipedia.org/wiki/The_Creation_of_Adam',
        workName: 'Âdem’in Yaratılışı',
        bio: 'Michelangelo, Floransa’da eğitim aldı; Medici çevresiyle çalışmasının ardından Roma’da papalık projelerinde önemli görevler üstlendi. Heykel, resim, mimarlık ve şiir alanlarında üretim yaptı. Sistina Şapeli tavanı üzerinde yıllarca çalışması, büyük ölçekli fresk anlayışının başyapıtlarından biri kabul edilir.'
      },
      'Raffaello Sanzio': {
        portrait: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f6/Raffaello_Sanzio.jpg/330px-Raffaello_Sanzio.jpg',
        work: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg/330px-%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg',
        workPage: 'https://en.wikipedia.org/wiki/The_School_of_Athens',
        workName: 'Atina Okulu',
        bio: 'Urbino’da doğan Raffaello, genç yaşta Perugia’da Perugino’nun çevresinde çalıştı; Floransa’da Leonardo ve Michelangelo’nun eserlerini inceleyerek üslubunu geliştirdi. Roma’ya çağrıldıktan sonra Vatikan odalarının fresklerini yönetti. Dengeli kompozisyonları ve atölyesindeki üretim düzeniyle Rönesans sanatına kalıcı bir iz bıraktı.'
      },
      'Sandro Botticelli': {
        portrait: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d4/Sandro_Botticelli_083.jpg/330px-Sandro_Botticelli_083.jpg',
        work: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/330px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg',
        workPage: 'https://en.wikipedia.org/wiki/The_Birth_of_Venus',
        workName: 'Venüs’ün Doğuşu',
        bio: 'Botticelli, Floransa’da Fra Filippo Lippi’nin atölyesinde yetişti ve Medici ailesinin himayesinde önemli siparişler aldı. Zarif çizgileri, ritmik figürleri ve mitolojik konulara ilgisiyle tanındı. Döneminin sonunda dinsel temalara yönelse de eserleri yüzyıllar sonra yeniden keşfedilerek geniş bir ilgi gördü.'
      },
      'Caravaggio': {
        portrait: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/73/Bild-Ottavio_Leoni%2C_Caravaggio.jpg/330px-Bild-Ottavio_Leoni%2C_Caravaggio.jpg',
        work: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/Caravaggio_%E2%80%94_The_Calling_of_Saint_Matthew.jpg/330px-Caravaggio_%E2%80%94_The_Calling_of_Saint_Matthew.jpg',
        workPage: 'https://en.wikipedia.org/wiki/The_Calling_of_Saint_Matthew',
        workName: 'Aziz Matta’nın Çağrılışı',
        bio: 'Milano’da eğitim gören Caravaggio, Roma’da kilise ve özel koleksiyonlar için çalıştı. Modellerini gündelik hayattan seçmesi ve sahneleri güçlü ışık-karanlık karşıtlığıyla kurması dönemin resim anlayışını değiştirdi. Çalkantılı yaşamı nedeniyle Roma’dan ayrıldı; Napoli, Malta ve Sicilya’da üretmeye devam etti.'
      },
      'Rembrandt van Rijn': {
        portrait: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg/330px-Rembrandt_van_Rijn_-_Self-Portrait_-_Google_Art_Project.jpg',
        work: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3a/La_ronda_de_noche%2C_por_Rembrandt_van_Rijn.jpg/330px-La_ronda_de_noche%2C_por_Rembrandt_van_Rijn.jpg',
        workPage: 'https://en.wikipedia.org/wiki/The_Night_Watch',
        workName: 'Gece Devriyesi',
        bio: 'Leiden’de eğitim alan Rembrandt, kariyerinin büyük bölümünü Amsterdam’da geçirdi. Portre, tarih resmi, manzara, gravür ve otoportre alanlarında üretim yaptı. Işığı dramatik biçimde kullanması kadar, modellerinin yüz ifadelerindeki psikolojik derinliği de sanatının ayırt edici yönüdür.'
      },
      'Johannes Vermeer': {
        portrait: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/Cropped_version_of_Jan_Vermeer_van_Delft_002.jpg/330px-Cropped_version_of_Jan_Vermeer_van_Delft_002.jpg',
        work: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/330px-1665_Girl_with_a_Pearl_Earring.jpg',
        workPage: 'https://en.wikipedia.org/wiki/Girl_with_a_Pearl_Earring',
        workName: 'İnci Küpeli Kız',
        bio: 'Vermeer yaşamı boyunca Delft’ten ayrılmadı ve üretimi oldukça sınırlı kaldı. Ev içi sahnelerinde pencere ışığını, sakin renkleri ve gündelik eşyaları büyük bir dikkatle resmetti. Yaşadığı dönemde tanınsa da eserlerinin uluslararası ünü özellikle 19. yüzyılda yeniden değerlendirilmesiyle arttı.'
      },
      'Diego Velázquez': {
        portrait: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Diego_Vel%C3%A1zquez_Autorretrato_45_x_38_cm_-_Colecci%C3%B3n_Real_Academia_de_Bellas_Artes_de_San_Carlos_-_Museo_de_Bellas_Artes_de_Valencia.jpg/330px-Diego_Vel%C3%A1zquez_Autorretrato_45_x_38_cm_-_Colecci%C3%B3n_Real_Academia_de_Bellas_Artes_de_San_Carlos_-_Museo_de_Bellas_Artes_de_Valencia.jpg',
        work: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/31/Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg/330px-Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg',
        workPage: 'https://en.wikipedia.org/wiki/Las_Meninas',
        workName: 'Nedimeler (Las Meninas)',
        bio: 'Sevilla’da yetişen Velázquez, Madrid sarayına ressam olarak alındı ve Kral IV. Felipe’nin çevresini uzun yıllar resmetti. İtalya seyahatleri sırasında antik sanatı ve çağdaş ressamları inceledi. Serbest fırça kullanımı ve izleyicinin bakışını kompozisyonun parçası hâline getirmesi, sonraki ressamlara ilham verdi.'
      },
      'Peter Paul Rubens': {
        portrait: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Peter_Paul_Rubens_-_Self-portrait_-_RH.S.180_-_Rubenshuis_%28after_restoration%29.jpg/330px-Peter_Paul_Rubens_-_Self-portrait_-_RH.S.180_-_Rubenshuis_%28after_restoration%29.jpg',
        work: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/Peter_Paul_Rubens_-_Fall_of_the_damned.jpg/330px-Peter_Paul_Rubens_-_Fall_of_the_damned.jpg',
        workPage: 'https://en.wikipedia.org/wiki/The_Fall_of_the_Damned',
        workName: 'Cehenneme Düşüş',
        bio: 'Rubens, Antwerp’te büyük bir atölye kurarak Avrupa saraylarından siparişler aldı. İtalya’daki yıllarında antik heykelleri ve Rönesans ustalarını inceledi; dönüşünde bu etkileri canlı renkler ve hareketli figürlerle birleştirdi. Ressamlığının yanında diplomatik görevler üstlenmesi, onu dönemin kültürel ve siyasi yaşamında da etkili kıldı.'
      },
      'Albrecht Dürer': {
        portrait: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/D%C3%BCrer_Alte_Pinakothek.jpg/330px-D%C3%BCrer_Alte_Pinakothek.jpg',
        work: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Albrecht_D%C3%BCrer_-_Hare%2C_1502_-_Google_Art_Project.jpg/330px-Albrecht_D%C3%BCrer_-_Hare%2C_1502_-_Google_Art_Project.jpg',
        workPage: 'https://en.wikipedia.org/wiki/Young_Hare',
        workName: 'Yabani Tavşan',
        bio: 'Nürnberg’de yaşayan Dürer, İtalya seyahatlerinde perspektif ve oran üzerine çalıştı; bu bilgileri Kuzey Avrupa’nın ayrıntılı gözlem geleneğiyle birleştirdi. Gravür ve ahşap baskıları sayesinde eserleri geniş kitlelere ulaştı. İnsan, hayvan ve bitki çizimleri, doğayı dikkatle inceleyen sanatçı kimliğini yansıtır.'
      }
    };

    artistGrid.querySelectorAll('.artist-card').forEach((card) => {
      const title = card.querySelector('h2');
      const artistName = title.firstChild.textContent.trim();
      const mediaInfo = artistMedia[artistName];
      const heading = document.createElement('summary');
      const name = document.createElement('span');
      const dates = document.createElement('small');
      const arrow = document.createElement('span');
      const content = document.createElement('div');
      const accordion = document.createElement('details');

      name.textContent = artistName;
      dates.textContent = title.querySelector('small').textContent;
      arrow.textContent = '＋';
      arrow.setAttribute('aria-hidden', 'true');
      heading.className = 'accordion-header';
      heading.append(name, dates, arrow);
      content.className = 'artist-accordion-content';
      accordion.className = 'accordion-item artist-accordion';
      accordion.append(heading, content);

      Array.from(card.children).forEach((child) => {
        if (child !== title) content.append(child);
      });
      if (mediaInfo) {
        const media = document.createElement('div');
        const portraitFigure = document.createElement('figure');
        const portrait = document.createElement('img');
        const portraitCaption = document.createElement('figcaption');
        const portraitLink = document.createElement('a');
        const workFigure = document.createElement('figure');
        const work = document.createElement('img');
        const workCaption = document.createElement('figcaption');
        const workLink = document.createElement('a');
        const expandedBio = document.createElement('p');

        media.className = 'artist-media';
        portraitFigure.className = 'artist-portrait';
        portrait.src = mediaInfo.portrait;
        portrait.alt = `${artistName} portresi`;
        portrait.loading = 'lazy';
        portraitLink.href = content.querySelector('.source-link').href;
        portraitLink.target = '_blank';
        portraitLink.rel = 'noopener noreferrer';
        portraitLink.append(portrait);
        portraitCaption.textContent = `${artistName} portresi · Vikipedi / Wikimedia Commons`;
        portraitFigure.append(portraitLink, portraitCaption);
        workFigure.className = 'artist-featured-work';
        work.src = mediaInfo.work;
        work.alt = `${mediaInfo.workName} tablosu`;
        work.loading = 'lazy';
        workLink.href = mediaInfo.workPage;
        workLink.target = '_blank';
        workLink.rel = 'noopener noreferrer';
        workLink.append(work);
        workCaption.textContent = `${mediaInfo.workName} · Vikipedi / Wikimedia Commons`;
        workFigure.append(workLink, workCaption);
        media.append(portraitFigure, workFigure);
        expandedBio.textContent = mediaInfo.bio;
        expandedBio.className = 'artist-expanded-bio';
        content.prepend(expandedBio);
        content.prepend(media);
      }
      card.replaceWith(accordion);

      accordion.addEventListener('toggle', () => {
        if (!accordion.open) return;
        artistGrid.querySelectorAll('.artist-accordion[open]').forEach((other) => {
          if (other !== accordion) other.open = false;
        });
      });
    });

    const originalArtists = Array.from(artistGrid.querySelectorAll('.artist-accordion')).map((accordion) => {
      const heading = accordion.querySelector('.accordion-header');
      const content = accordion.querySelector('.artist-accordion-content');
      const featured = content.querySelector('.artist-featured-work');
      const name = heading.querySelector('span').textContent;
      const period = ['Caravaggio', 'Rembrandt van Rijn', 'Johannes Vermeer', 'Diego Velázquez', 'Peter Paul Rubens'].includes(name)
        ? 'Barok'
        : 'Rönesans';
      const works = Array.from(content.querySelectorAll('ol li')).map((item) => ({
        title: item.querySelector('b')?.textContent.trim() || item.textContent.trim(),
        description: item.textContent.replace(item.querySelector('b')?.textContent || '', '').replace(/^[\s—-]+/, '').trim()
      }));
      return {
        name,
        period,
        dates: heading.querySelector('small').textContent,
        portrait: content.querySelector('.artist-portrait img').src,
        bio: content.querySelector('.artist-expanded-bio').textContent,
        source: content.querySelector('.source-link').href,
        featuredTitle: content.querySelector('.artist-featured-work figcaption').textContent.split(' · ')[0],
        featuredImage: featured.querySelector('img').src,
        works
      };
    });
    const addedArtists = (window.additionalArtistCatalog || []).map((artist) => ({
      ...artist,
      source: `https://en.wikipedia.org/wiki/${artist.slug}`,
      portrait: '',
      featuredTitle: artist.works.split('|')[0],
      featuredImage: '',
      works: artist.works.split('|').map((title) => ({
        title,
        description: `${title}, ${artist.name} sanatının ${artist.style} yönünü yansıtan eserleri arasında değerlendirilir. Kompozisyonu ve konusu, sanatçının dönemindeki tercihleriyle birlikte okunabilir.`
      }))
    }));
    const periodOrder = [
      'Rönesans',
      'Barok',
      'Neoklasik ve Romantik',
      'İzlenimcilik ve Sonrası',
      'Modern Sanat',
      'Çağdaş Sanat'
    ];
    const artistEntries = [...originalArtists, ...addedArtists].sort(
      (first, second) => periodOrder.indexOf(first.period) - periodOrder.indexOf(second.period)
    );

    if (artistEntries.length) {
      const layout = document.createElement('div');
      const sidebar = document.createElement('aside');
      const artistButtons = document.createElement('div');
      const detail = document.createElement('section');
      const workCache = new Map();
      const portraitCache = new Map();
      let activeArtistIndex = 0;

      layout.className = 'artist-browser';
      sidebar.className = 'artist-sidebar';
      sidebar.setAttribute('aria-label', 'Sanatçı seçimi');
      artistButtons.className = 'artist-list';
      detail.className = 'artist-detail';
      detail.setAttribute('aria-live', 'polite');
      sidebar.append(artistButtons);
      layout.append(sidebar, detail);

      const loadWorkImage = async (artist, work, image, status, sourceLink) => {
        const cacheKey = `${artist.name}:${work.title}`;
        if (workCache.has(cacheKey)) {
          const cached = workCache.get(cacheKey);
          if (cached.url) image.src = cached.url;
          if (cached.source) sourceLink.href = cached.source;
          status.textContent = cached.error || '';
          return;
        }

        status.textContent = 'Eser görseli aranıyor…';
        sourceLink.href = `https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=${encodeURIComponent(`${work.title} ${artist.name}`)}`;
        try {
          const query = new URLSearchParams({
            action: 'query',
            generator: 'search',
            gsrsearch: `${work.title} ${artist.name}`,
            gsrnamespace: '6',
            gsrlimit: '1',
            prop: 'imageinfo',
            iiprop: 'url',
            iiurlwidth: '1200',
            format: 'json',
            origin: '*'
          });
          const response = await fetch(`https://commons.wikimedia.org/w/api.php?${query}`);
          if (!response.ok) throw new Error(`Wikimedia Commons returned ${response.status}`);
          const result = await response.json();
          const page = Object.values(result.query?.pages || {})[0];
          const imageInfo = page?.imageinfo?.[0];
          if (!imageInfo?.thumburl) throw new Error('Bu eser için görsel bulunamadı.');

          workCache.set(cacheKey, { url: imageInfo.thumburl, source: imageInfo.descriptionurl });
          image.src = imageInfo.thumburl;
          image.alt = `${work.title} — ${artist.name}`;
          sourceLink.href = imageInfo.descriptionurl;
          status.textContent = 'Görsel: Wikimedia Commons';
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Eser görseli yüklenemedi.';
          workCache.set(cacheKey, { error: `${message} Wikimedia Commons’ta aramak için kaynak bağlantısını kullanın.` });
          status.textContent = `${message} Wikimedia Commons’ta aramak için kaynak bağlantısını kullanın.`;
        }
      };

      const loadPortrait = async (artist, image, status, sourceLink) => {
        sourceLink.href = `https://commons.wikimedia.org/wiki/Special:MediaSearch?type=image&search=${encodeURIComponent(`${artist.name} portrait`)}`;
        if (portraitCache.has(artist.name)) {
          const cached = portraitCache.get(artist.name);
          if (cached.url) image.src = cached.url;
          if (cached.source) sourceLink.href = cached.source;
          status.textContent = cached.error || '';
          return;
        }

        status.textContent = 'Sanatçı portresi aranıyor…';
        try {
          const query = new URLSearchParams({
            action: 'query',
            titles: artist.slug,
            prop: 'pageimages',
            piprop: 'thumbnail',
            pithumbsize: '420',
            format: 'json',
            origin: '*'
          });
          const response = await fetch(`https://en.wikipedia.org/w/api.php?${query}`);
          if (!response.ok) throw new Error(`Wikipedia returned ${response.status}`);
          const result = await response.json();
          const page = Object.values(result.query?.pages || {})[0];
          const portraitUrl = page?.thumbnail?.source;
          if (!portraitUrl) throw new Error('Sanatçı portresi bulunamadı.');
          portraitCache.set(artist.name, { url: portraitUrl, source: artist.source });
          image.src = portraitUrl;
          image.alt = `${artist.name} portresi`;
          sourceLink.href = artist.source;
          status.textContent = 'Portre görseli: Vikipedi / Wikimedia Commons';
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Portre görseli yüklenemedi.';
          portraitCache.set(artist.name, { error: message });
          status.textContent = message;
        }
      };

      const renderArtist = (artistIndex) => {
        activeArtistIndex = artistIndex;
        const artist = artistEntries[artistIndex];
        artistButtons.querySelectorAll('button').forEach((button, index) => {
          button.classList.toggle('active', index === artistIndex);
          button.setAttribute('aria-pressed', String(index === artistIndex));
        });
        detail.replaceChildren();

        const intro = document.createElement('div');
        const portrait = document.createElement('img');
        const portraitStatus = document.createElement('p');
        const portraitSource = document.createElement('a');
        const identity = document.createElement('div');
        const title = document.createElement('h2');
        const dates = document.createElement('p');
        const biography = document.createElement('p');
        const bioLink = document.createElement('a');
        const worksTitle = document.createElement('h3');
        const works = document.createElement('div');
        const showcase = document.createElement('section');
        const workImage = document.createElement('img');
        const caption = document.createElement('h3');
        const description = document.createElement('p');
        const sourceLine = document.createElement('div');
        const sourceLink = document.createElement('a');
        const status = document.createElement('p');

        intro.className = 'artist-detail-intro';
        portrait.className = 'artist-detail-portrait';
        portrait.alt = `${artist.name} portresi`;
        if (artist.portrait) portrait.src = artist.portrait;
        portraitStatus.className = 'artist-portrait-status';
        portraitStatus.textContent = artist.portrait ? 'Portre görseli: Wikimedia Commons' : 'Portre görseli aranıyor…';
        portraitSource.className = 'artist-portrait-source';
        portraitSource.textContent = 'Görsel ve sanatçı kaynağı';
        portraitSource.target = '_blank';
        portraitSource.rel = 'noopener noreferrer';
        title.textContent = artist.name;
        dates.className = 'artist-dates';
        dates.textContent = artist.dates;
        biography.className = 'artist-bio';
        biography.textContent = artist.bio;
        bioLink.href = artist.source;
        bioLink.target = '_blank';
        bioLink.rel = 'noopener noreferrer';
        bioLink.textContent = 'Yaşam öyküsü ve kaynak';
        identity.append(title, dates, biography, bioLink);
        const portraitWrap = document.createElement('div');
        portraitWrap.className = 'artist-portrait-wrap';
        portraitWrap.append(portrait, portraitStatus, portraitSource);
        if (artist.portrait) portraitSource.href = artist.source;
        intro.append(portraitWrap, identity);
        if (!artist.portrait) loadPortrait(artist, portrait, portraitStatus, portraitSource);

        worksTitle.className = 'artist-works-title';
        worksTitle.textContent = 'Eserleri';
        works.className = 'artist-works';

        showcase.className = 'artist-work-showcase';
        workImage.className = 'artist-work-image';
        workImage.alt = '';
        caption.className = 'artist-work-title';
        description.className = 'artist-work-description';
        sourceLine.className = 'artist-work-source';
        sourceLink.target = '_blank';
        sourceLink.rel = 'noopener noreferrer';
        sourceLink.textContent = 'Görsel kaynağı / Wikimedia Commons';
        status.className = 'artist-image-status';
        status.setAttribute('role', 'status');
        sourceLine.append(sourceLink, status);
        showcase.append(workImage, caption, description, sourceLine);
        detail.append(intro, worksTitle, works, showcase);

        const selectWork = (work, index) => {
          works.querySelectorAll('button').forEach((button, workIndex) => {
            button.classList.toggle('active', workIndex === index);
            button.setAttribute('aria-pressed', String(workIndex === index));
          });
          caption.textContent = work.title;
          description.textContent = work.description;
          workImage.alt = `${work.title} — ${artist.name}`;
          const isFeatured = artist.featuredImage && work.title.toLocaleLowerCase('tr') === artist.featuredTitle.toLocaleLowerCase('tr');
          if (isFeatured) {
            workImage.src = artist.featuredImage;
            sourceLink.href = artist.source;
            status.textContent = 'Görsel: Wikimedia Commons';
          } else {
            workImage.removeAttribute('src');
            loadWorkImage(artist, work, workImage, status, sourceLink);
          }
        };

        artist.works.forEach((work, index) => {
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'artist-work-option';
          button.textContent = work.title;
          button.addEventListener('click', () => selectWork(work, index));
          works.append(button);
        });
        const featuredIndex = artist.works.findIndex((work) =>
          work.title.toLocaleLowerCase('tr') === artist.featuredTitle.toLocaleLowerCase('tr')
        );
        selectWork(artist.works[featuredIndex >= 0 ? featuredIndex : 0], featuredIndex >= 0 ? featuredIndex : 0);
      };

      let previousPeriod = '';
      artistEntries.forEach((artist, index) => {
        if (artist.period !== previousPeriod) {
          const periodHeading = document.createElement('h3');
          periodHeading.className = 'artist-period-heading';
          periodHeading.textContent = artist.period;
          artistButtons.append(periodHeading);
          previousPeriod = artist.period;
        }
        const button = document.createElement('button');
        const artistName = document.createElement('span');
        const artistDates = document.createElement('small');
        button.type = 'button';
        button.className = 'artist-select';
        artistName.textContent = artist.name;
        artistDates.textContent = artist.dates;
        button.append(artistName, artistDates);
        button.addEventListener('click', () => renderArtist(index));
        artistButtons.append(button);
      });
      artistGrid.replaceWith(layout);
      renderArtist(activeArtistIndex);
    }
  }

  const filterButtons = document.querySelectorAll('.filters [data-filter]');
  const gallery = document.querySelector('.gallery');
  const modal = document.getElementById('imageModal');

  if (gallery) {
    const allItems = Array.from(gallery.querySelectorAll('.item'));
    let activeItems = allItems;
    let activeIndex = 0;
    const modalImage = document.getElementById('modalImage');
    const counter = modal.querySelector('.modal-counter');

    const showImage = (index) => {
      if (!activeItems.length) return;
      activeIndex = (index + activeItems.length) % activeItems.length;
      const image = activeItems[activeIndex].querySelector('img');
      modalImage.src = image.src;
      modalImage.alt = image.alt;
      counter.textContent = `${activeIndex + 1} / ${activeItems.length}`;
    };

    const closeModal = () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    };

    const openModal = (item) => {
      activeItems = allItems.filter((galleryItem) => !galleryItem.classList.contains('hide'));
      activeIndex = activeItems.indexOf(item);
      showImage(activeIndex);
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      modal.querySelector('.close').focus();
    };

    allItems.forEach((item) => item.addEventListener('click', () => openModal(item)));

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        filterButtons.forEach((filterButton) => filterButton.classList.toggle('active', filterButton === button));
        const filter = button.dataset.filter;
        allItems.forEach((item) => item.classList.toggle('hide', filter !== 'all' && !item.classList.contains(filter)));
      });
    });

    modal.querySelector('.close').addEventListener('click', closeModal);
    modal.querySelector('.modal-prev').addEventListener('click', () => showImage(activeIndex - 1));
    modal.querySelector('.modal-next').addEventListener('click', () => showImage(activeIndex + 1));
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeModal();
    });
    document.addEventListener('keydown', (event) => {
      if (!modal.classList.contains('is-open')) return;
      if (event.key === 'Escape') closeModal();
      if (event.key === 'ArrowLeft') showImage(activeIndex - 1);
      if (event.key === 'ArrowRight') showImage(activeIndex + 1);
    });

    let touchStartX = null;
    modal.addEventListener('touchstart', (event) => {
      touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });
    modal.addEventListener('touchend', (event) => {
      if (touchStartX === null) return;
      const distance = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(distance) > 45) showImage(activeIndex + (distance < 0 ? 1 : -1));
      touchStartX = null;
    }, { passive: true });
  }

  const calculator = document.getElementById('priceCalculator');
  if (calculator) {
    const priceTable = {
      '25x30': 1000,
      '35x50': 1400,
      '50x70': 3000,
      '70x100': 5000
    };
    const priceOutput = document.getElementById('estimatedPrice');
    const photoInput = document.getElementById('orderPhoto');
    const status = document.getElementById('orderStatus');
    const styleGroup = calculator.querySelector('.style-group');
    const sizeGroup = calculator.querySelector('.size-group');
    const money = new Intl.NumberFormat('tr-TR');

    const updateEstimate = () => {
      const technique = calculator.querySelector('[name="technique"]:checked').value;
      const isDigital = technique === 'digital';
      styleGroup.hidden = !isDigital;
      sizeGroup.hidden = isDigital;
      const size = isDigital ? null : calculator.querySelector('[name="size"]:checked').value;
      const digitalStyle = isDigital ? calculator.querySelector('[name="digitalStyle"]:checked').value : null;
      const people = Number(calculator.elements.figures.value);
      const animals = Number(calculator.elements.animals.value);
      const totalFigures = people + animals;
      const basePrice = isDigital ? 800 : priceTable[size];
      const total = basePrice + (isDigital ? 0 : Math.max(0, totalFigures - 1) * 400);
      priceOutput.textContent = `${money.format(total)} TL`;
      return { technique, size, digitalStyle, people, animals, totalFigures, total };
    };

    calculator.addEventListener('change', updateEstimate);
    calculator.querySelectorAll('.count-choice').forEach((button) => {
      button.addEventListener('click', () => {
        const group = button.dataset.countGroup;
        calculator.elements[group].value = button.dataset.countValue;
        calculator.querySelectorAll(`.count-choice[data-count-group="${group}"]`).forEach((option) => {
          const selected = option === button;
          option.classList.toggle('active', selected);
          option.setAttribute('aria-pressed', String(selected));
        });
        updateEstimate();
      });
    });
    updateEstimate();
    calculator.addEventListener('submit', async (event) => {
      event.preventDefault();
      const estimate = updateEstimate();
      const techniqueNames = {
        karakalem: 'Karakalem',
        yagli: 'Yağlıboya',
        digital: 'Dijital',
        sulu: 'Suluboya',
        kurukalem: 'Kuru kalem'
      };
      const photo = photoInput.files[0];
      const message = [
        'Merhaba, portre siparişi vermek istiyorum.',
        `Teknik: ${techniqueNames[estimate.technique]}`,
        estimate.digitalStyle ? `Dijital stil: ${estimate.digitalStyle}` : `Boyut: ${estimate.size.replace('x', '×')} cm`,
        `İnsan figürü: ${estimate.people}`,
        `Hayvan: ${estimate.animals}`,
        `Tahmini fiyat: ${money.format(estimate.total)} TL`,
        photo ? `Fotoğraf: ${photo.name} (lütfen bu sohbete ekleyin)` : ''
      ].filter(Boolean).join('\n');
      const whatsappUrl = `https://wa.me/905523910092?text=${encodeURIComponent(message)}`;

      if (photo && navigator.share && navigator.canShare && navigator.canShare({ files: [photo] })) {
        try {
          await navigator.share({ title: 'Sanatlan portre siparişi', text: message, files: [photo] });
          status.textContent = 'Paylaşım ekranı açıldı. WhatsApp’ı seçerek fotoğrafınızı ve sipariş bilgilerinizi gönderebilirsiniz.';
          return;
        } catch (error) {
          if (error.name === 'AbortError') {
            status.textContent = 'Paylaşım iptal edildi. Siparişinizi daha sonra tekrar gönderebilirsiniz.';
            return;
          }
          status.textContent = 'Fotoğraf paylaşımı açılamadı. WhatsApp mesajı açılıyor; fotoğrafı sohbete ayrıca ekleyebilirsiniz.';
        }
      } else if (photo) {
        status.textContent = 'Bu tarayıcı dosyayı WhatsApp’a doğrudan aktaramıyor. Mesaj açılacak; fotoğrafı sohbete ayrıca ekleyin.';
      } else {
        status.textContent = 'WhatsApp mesajı açılıyor.';
      }

      window.location.assign(whatsappUrl);
    });
  }
});

  const reproductionCalculator = document.getElementById('reproductionCalculator');
  if (reproductionCalculator) {
    const money = new Intl.NumberFormat('tr-TR');
    const updateReproductionEstimate = () => {
      const width = Number(reproductionCalculator.querySelector('#reproductionWidth').value);
      const height = Number(reproductionCalculator.querySelector('#reproductionHeight').value);
      const people = Number(reproductionCalculator.elements.reproductionPeople.value);
      const animals = Number(reproductionCalculator.elements.reproductionAnimals.value);
      const area = (width * height) / 10000;
      const total = area * 6000;
      reproductionCalculator.querySelector('#reproductionPrice').textContent = area > 0 ? money.format(total) + ' TL' : '0 TL';
      return { width, height, people, animals, area, total };
    };
    reproductionCalculator.addEventListener('input', updateReproductionEstimate);
    reproductionCalculator.querySelectorAll('.count-choice').forEach((button) => {
      button.addEventListener('click', () => {
        const group = button.dataset.countGroup;
        reproductionCalculator.elements[group].value = button.dataset.countValue;
        reproductionCalculator.querySelectorAll('.count-choice[data-count-group="' + group + '"]').forEach((option) => {
          const selected = option === button;
          option.classList.toggle('active', selected);
          option.setAttribute('aria-pressed', String(selected));
        });
        updateReproductionEstimate();
      });
    });
    updateReproductionEstimate();
  }
